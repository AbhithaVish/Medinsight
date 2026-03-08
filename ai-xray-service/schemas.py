from pydantic import BaseModel

class XrayResponse(BaseModel):
    body_part: str
    condition: str
    confidence: float
    risk_level: str
    summary: str