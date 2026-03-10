import json
import os
import threading
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "db.json")
db_lock = threading.RLock()

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
    with db_lock:
        _ensure_db_exists()
        try:
            with open(DB_PATH, "r") as f:
                return json.load(f)
        except json.JSONDecodeError:
            # If the file is currently being written by another thread and is empty
            return {
                "calendar": [],
                "validations": [],
                "report": {},
                "audit_logs": []
            }

def write_json_db(data):
    with db_lock:
        with open(DB_PATH, "w") as f:
            json.dump(data, f, indent=4)

def log_audit_event(step: str, input_data: str, output_data: str, status: str = "SUCCESS"):
    with db_lock:
        db = read_json_db()
        event = {
            "timestamp": datetime.now().astimezone().isoformat(),
            "step": step,
            "input": input_data,
            "output": output_data,
            "status": status
        }
        db.setdefault("audit_logs", []).insert(0, event)
        write_json_db(db)
