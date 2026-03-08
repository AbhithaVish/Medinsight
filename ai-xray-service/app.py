from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from utils.preprocess import preprocess_image
from utils.predict import predict
from schemas import XrayResponse
from utils.recommender import get_recommendations # මම හිතනවා ඔයා recommender.py එක හැදුවා කියලා

app = FastAPI(title="MedInsight X-Ray AI Service")

# CORS Setup - Frontend (React) එකට සම්බන්ධ වීමට
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_summary(body_part, condition, confidence):
    # condition එක lowercase කරලා check කිරීම වඩාත් ආරක්ෂිතයි
    if condition.lower() == "fracture":
        risk = "HIGH" if confidence > 0.80 else "MODERATE"
        summary = f"Possible fracture detected in the {body_part}. Please consult an orthopedic specialist."
    else:
        risk = "LOW"
        summary = f"No visible fracture detected in the {body_part}. The bone structure appears normal."
    return risk, summary

@app.post("/analyze-xray", response_model=XrayResponse)
async def analyze_xray(file: UploadFile = File(...)):
    # 1. පින්තූරය කියවා AI එකට සූදානම් කිරීම
    image_bytes = await file.read()
    image_array = preprocess_image(image_bytes)

    # 2. AI Prediction එක ලබා ගැනීම
    # මෙතනින් result={"body_part": "...", "condition": "...", "confidence": ...} ලැබෙනවා
    result = predict(image_array)

    # 3. Summary සහ Risk Level සකස් කිරීම
    risk, summary = generate_summary(
        result["body_part"],
        result["condition"],
        result["confidence"]
    )

    # 4. Recommendation Tags ලබා ගැනීම (මෙන්න අලුත් කොටස)
    # AI එක දුන්න condition එක (උදා: Fracture) අනුව tags හොයනවා
    product_tags = get_recommendations(result["condition"])

    # 5. සියලුම ප්‍රතිඵල එකවර යැවීම
    return {
        "body_part": result["body_part"],
        "condition": result["condition"],
        "confidence": result["confidence"],
        "risk_level": risk,
        "summary": summary,
        "recommended_tags": product_tags # React එකට අවශ්‍ය tags ටික මෙතනින් යනවා
    }