from pydantic import BaseModel, Field
from typing import List, Optional

class RegulationObligation(BaseModel):
    id: int
    reporting_rule: str
    reporting_frequency: str
    threshold_conditions: str
    deadline: str

class ValidationResult(BaseModel):
    transaction_id: str
    violation: str
    details: str

class ComplianceReport(BaseModel):
    report_id: int
    content: str
    status: str

class AuditEvent(BaseModel):
    timestamp: str
    step: str
    input: str
    output: str
    status: str
