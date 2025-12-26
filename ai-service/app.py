from fastapi import FastAPI, File, UploadFile
from PIL import Image
import numpy as np
import io

app = FastAPI()

@app.post("/analyze-xray")
async def analyze_xray(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # 🔴 TEMPORARY MOCK RESPONSE
    report = {
        "findings": [
            "No critical abnormalities detected",
            "Lung structure appears normal"
        ],
        "confidence": 0.78
    }

    return report
