import numpy as np
import tensorflow as tf

# Load model once
model = tf.keras.models.load_model("models/medinsight_fracture_professional.h5")

def decode_prediction(preds):
    # Since it's a binary model, preds will look like [[0.85]]
    # We extract that single value
    score = float(preds[0][0])
    
    # Logic: If score > 0.5, it's a fracture.
    # The closer to 1, the more confident it's a fracture.
    # The closer to 0, the more confident it's normal.
    if score > 0.5:
        condition = "normal"   # 1 is Normal
        confidence = score
    else:
        condition = "fracture" # 0 is Fracture
        confidence = 1.0 - score
    return {
        "body_part": "hand", # Placeholder since binary models don't detect body parts
        "condition": condition,
        "confidence": round(confidence, 4)
    }

def predict(image_array):
    preds = model.predict(image_array)
    return decode_prediction(preds)