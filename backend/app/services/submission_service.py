from app.utils.db_utils import log_audit_event, read_json_db, write_json_db
from tenacity import retry, stop_after_attempt, wait_fixed
import time

@retry(stop=stop_after_attempt(3), wait=wait_fixed(1))
def perform_submission(report_content: str) -> str:
    """Simulates a network submission to a regulatory body."""
    log_audit_event("Submission Simulation", "Submitting report via network", "Success: 200 OK")
    
    db = read_json_db()
    if "report" in db:
        if isinstance(db["report"], dict):
            db["report"]["status"] = "Submitted"
        else:
            # If it's a list for some reason
            pass
    write_json_db(db)
    
    return "Report has been officially submitted to the mock regulatory authority. Status: 200 OK."
