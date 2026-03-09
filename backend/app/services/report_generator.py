from app.utils.db_utils import log_audit_event, read_json_db, write_json_db
import json

def generate_compliance_report(validation_results: list, regulation_context: str) -> str:
    """Generates a formalized Markdown compliance report based on validation failures."""
    if not validation_results:
        summary = "No violations found. System is fully compliant."
    else:
        summary = f"Found {len(validation_results)} total violations.\n"
        for v in validation_results:
            summary += f"- {v.get('transaction_id', 'Unknown')}: {v.get('error', 'Unknown Error')}\n"
    
    report_content = f"""
===================================================
        REGULATORY COMPLIANCE REPORT
===================================================
Target Regulation Context: {regulation_context}

SUMMARY OF REVIEW:
{summary}

ACTION REQUIRED:
Please review flagged transactions.
===================================================
"""
    
    db = read_json_db()
    db["report"] = {
        "report_id": len(db.get("report", [])) + 1,
        "content": report_content,
        "status": "Ready for Submission"
    }
    write_json_db(db)
    
    log_audit_event("Report Generation", str(len(validation_results)) + " errors", "Generated Standard Markdown Report")
    return report_content
