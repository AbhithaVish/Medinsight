from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from utils.preprocess import preprocess_image
from utils.predict import predict, model
from utils.recommender import get_recommendations
from utils.heatmap import generate_gradcam, overlay_heatmap

from schemas import XrayResponse

app = FastAPI(title="MedInsight X-Ray AI Service")

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def generate_summary(body_part, condition, confidence):

    if condition.lower() == "fracture":
        risk = "HIGH" if confidence > 0.80 else "MODERATE"
        summary = f"Possible fracture detected in the {body_part}. Please consult an orthopedic specialist."
    else:
        risk = "LOW"
        summary = f"No visible fracture detected in the {body_part}. The bone structure appears normal."

    return risk, summary


@app.post("/analyze-xray", response_model=XrayResponse)
async def analyze_xray(file: UploadFile = File(...)):

    image_bytes = await file.read()

    # Preprocess image
    image_array = preprocess_image(image_bytes)

    # Model prediction
    result = predict(image_array)

    # Generate Grad-CAM heatmap
    heatmap = generate_gradcam(model, image_array)

    heatmap_img = overlay_heatmap(image_array[0] * 255, heatmap)

    # Generate summary
    risk, summary = generate_summary(
        result["body_part"],
        result["condition"],
        result["confidence"]
    )

    # Product recommendations
    product_tags = get_recommendations(result["condition"])

    return {
        "body_part": result["body_part"],
        "condition": result["condition"],
        "confidence": result["confidence"],
        "risk_level": risk,
        "summary": summary,
        "recommended_tags": product_tags,
        "heatmap": heatmap_img
    }