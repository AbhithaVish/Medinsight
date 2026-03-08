import json

# Sample mapping of AI results to pharmacy categories
RECOMMENDATION_MAP = {
    "Fracture": ["Calcium Carbonate", "Pain Relief Gel", "Arm Sling", "Medical Tape"],
    "Normal": ["Multivitamins", "Immunity Boosters"],
    "Pneumonia": ["Cough Syrup", "Vaporizer", "Vitamin C", "Thermometer"],
    "Arthritis": ["Glucosamine", "Knee Brace", "Anti-inflammatory Rub"]
}

def get_recommendations(diagnosis):
    """
    Returns a list of product categories based on AI diagnosis.
    """
    return RECOMMENDATION_MAP.get(diagnosis, ["General Wellness"])

# Example integration point for your app.py
def format_recommendation_response(diagnosis, products_from_db):
    """
    Filters your actual MySQL products based on the mapping.
    """
    tags = get_recommendations(diagnosis)
    # This logic would filter your 'products_from_db' list by these tags
    recommended = [p for p in products_from_db if any(tag in p['category'] for tag in tags)]
    return recommended