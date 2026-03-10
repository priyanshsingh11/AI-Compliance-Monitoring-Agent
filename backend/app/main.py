from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Compliance Monitoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ComplianceRequest(BaseModel):
    source_text: str

@app.get("/")
def read_root():
    return {"status": "AI Compliance API is running"}

from fastapi import UploadFile, File
import os
import shutil

@app.post("/run-compliance-check")
async def run_compliance_check(req: ComplianceRequest, background_tasks: BackgroundTasks):
    from app.agents.compliance_agent import run_agent_workflow
    background_tasks.add_task(run_agent_workflow, req.source_text)
    return {"status": "Processing initiated", "message": "The AI Agent has started workflow."}

@app.post("/upload-dataset")
async def upload_dataset(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    # Save the uploaded file to the app/data directory, overwriting the old one
    file_path = os.path.join(os.path.dirname(__file__), "data", file.filename)
    
    # Optional: Backup the old file before overwriting
    if os.path.exists(file_path):
        backup_path = f"{file_path}.backup"
        shutil.copy2(file_path, backup_path)
        
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Automatically trigger the compliance agent workflow
    from app.agents.compliance_agent import run_agent_workflow
    background_tasks.add_task(run_agent_workflow, f"New data uploaded: {file.filename}")
    
    return {"status": "Success", "message": f"{file.filename} uploaded and compliance check triggered."}

@app.post("/submit-report")
async def submit_report():
    from app.services.submission_service import perform_submission
    from app.utils.db_utils import read_json_db
    db = read_json_db()
    report = db.get("report", {})
    if not report or report.get("status") == "Submitted":
        return {"status": "Error", "message": "No draft report ready for submission."}
    
    result = perform_submission(report.get("content", ""))
    return {"status": "Success", "message": result}

@app.get("/regulatory-calendar")
def get_calendar():
    from app.utils.db_utils import read_json_db
    db = read_json_db()
    return db.get("calendar", [])

@app.get("/dashboard-stats")
def get_dashboard_stats():
    from app.utils.db_utils import read_json_db
    db = read_json_db()
    
    calendar = db.get("calendar", [])
    validations = db.get("validations", [])
    report = db.get("report", {})
    
    return {
        "regulations": len(calendar),
        "violations": len(validations),
        "report_status": report.get("status", "Pending"),
        "submission": "Success" if report.get("status") == "Ready for Submission" else "Pending"
    }

@app.get("/validation-results")
def get_validation_results():
    from app.utils.db_utils import read_json_db
    db = read_json_db()
    return db.get("validations", [])

@app.get("/report")
def get_report():
    from app.utils.db_utils import read_json_db
    db = read_json_db()
    return db.get("report", {})

@app.get("/audit-log")
def get_audit_log():
    from app.utils.db_utils import read_json_db
    db = read_json_db()
    return db.get("audit_logs", [])
