from app.services.regulation_monitor import extract_regulatory_updates
from app.services.regulatory_calendar import create_regulatory_calendar
from app.services.data_collector import load_data
from app.services.validation_engine import run_validation_rules
from app.services.report_generator import generate_compliance_report
from app.services.submission_service import perform_submission
from app.utils.db_utils import log_audit_event
import pandas as pd
import json

def run_agent_workflow(source_text: str):
    """
    A simplified deterministic workflow using LangChain's conceptual steps.
    For the prototype, to ensure reliability without a valid OpenAI key,
    we orchestrate the tools directly as an 'Agent', logging paths as we go.
    """
    log_audit_event("Agent Orchestrator", source_text, "Started Compliance Agent Workflow")
    
    try:
        # Step 1: Monitor
        monitor_result = extract_regulatory_updates(source_text)
        
        # Step 2: Calendar
        calendar_result = create_regulatory_calendar(monitor_result)
        
        # Step 3: Data Collection
        df_txns = load_data("transactions.csv")
        df_kyc = load_data("kyc_records.csv")
        
        # Step 4: Validation Engine
        validation_results = run_validation_rules({"transactions": df_txns, "kyc": df_kyc}, monitor_result)
        
        # Step 5: Report Generation
        report = generate_compliance_report(validation_results, monitor_result)
        
        # Step 6: Submission Simulation
        submission_result = perform_submission(report)
        
        log_audit_event("Agent Orchestrator", "submission complete", "Workflow Completed Successfully")
        return {"status": "success", "message": "Workflow Completed."}
        
    except Exception as e:
        log_audit_event("Agent Orchestrator", "workflow step", f"Workflow failed: {str(e)}", "ERROR")
        return {"status": "error", "message": str(e)}
