import numpy as np
import tensorflow as tf

# Load model once
model = tf.keras.models.load_model("models/medinsight_fracture_professional.h5")


def decode_prediction(preds):

    score = float(preds[0][0])

    if score > 0.5:
        condition = "normal"
        confidence = score
    else:
        condition = "fracture"
        confidence = 1.0 - score

    return {
        "body_part": "hand",
        "condition": condition,
        "confidence": round(confidence, 4)
    }


def predict(image_array):

    preds = model.predict(image_array)

    return decode_prediction(preds)