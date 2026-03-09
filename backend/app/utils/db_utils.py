import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "db.json")

def _ensure_db_exists():
    if not os.path.exists(DB_PATH):
        with open(DB_PATH, "w") as f:
            json.dump({
                "calendar": [],
                "validations": [],
                "report": {},
                "audit_logs": []
            }, f, indent=4)

def read_json_db():
    _ensure_db_exists()
    with open(DB_PATH, "r") as f:
        return json.load(f)

def write_json_db(data):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, indent=4)

def log_audit_event(step: str, input_data: str, output_data: str, status: str = "SUCCESS"):
    db = read_json_db()
    event = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "step": step,
        "input": input_data,
        "output": output_data,
        "status": status
    }
    db.setdefault("audit_logs", []).append(event)
    write_json_db(db)
