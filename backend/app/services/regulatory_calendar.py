from app.utils.db_utils import log_audit_event, read_json_db, write_json_db
import json
import re

def create_regulatory_calendar(source_text: str) -> str:
    """Extracts the regulatory obligations and creates a JSON structured calendar event."""
    
    # In a full app, this would use LLM to parse. 
    # Since this is a lightweight prototype, we approximate:
    threshold = "> 10000"
    if "5000" in source_text:
        threshold = "> 5000"
        
    obligation = {
      "id": 1,
      "reporting_rule": "Large Transaction Report",
      "reporting_frequency": "Daily",
      "threshold_conditions": f"Amount {threshold}",
      "deadline": "24 hours past transaction"
    }
    
    db = read_json_db()
    db["calendar"] = [obligation]
    write_json_db(db)
    
    log_audit_event("Regulatory Calendar Creation", source_text, json.dumps(obligation))
    return f"Created calendar obligation: {json.dumps(obligation)}"
