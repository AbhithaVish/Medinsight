from pydantic import BaseModel
from typing import List


class XrayResponse(BaseModel):

    body_part: str
    condition: str
    confidence: float
    risk_level: str
    summary: str
    recommended_tags: List[str]
    heatmap: str