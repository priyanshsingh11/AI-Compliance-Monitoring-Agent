import pandas as pd
import os
from app.utils.db_utils import log_audit_event

def load_data(file_name: str) -> pd.DataFrame:
    """Loads data from the datasets layer."""
    # For prototype, dataset is static
    csv_path = os.path.join(os.path.dirname(__file__), "..", "data", file_name)
    if not os.path.exists(csv_path):
        # Create an empty df or dummy one
        df = pd.DataFrame(columns=["transaction_id", "amount", "date", "customer_id", "status"])
        log_audit_event("Data Collection", file_name, "File not found. Returning empty df.", "WARNING")
        return df
    df = pd.read_csv(csv_path)
    log_audit_event("Data Collection", file_name, f"Loaded {len(df)} records.", "SUCCESS")
    return df
