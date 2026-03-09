import pandas as pd
from app.utils.db_utils import log_audit_event, read_json_db, write_json_db
import traceback

def run_validation_rules(df: pd.DataFrame, rules: str) -> list:
    """Applies compliance rules against the pandas dataframe."""
    anomalies = []
    
    if df.empty:
        log_audit_event("Validation", rules, "Empty dataframe provided", "WARNING")
        return anomalies
        
    try:
        # Check 1: Missing values in essential columns
        if 'amount' in df.columns:
            missing = df[df['amount'].isnull()]
            for _, row in missing.iterrows():
                anomalies.append({"transaction_id": row.get('transaction_id', 'Unknown'), "error": "Missing amount"})
                
        # For simplicity, extract threshold if "10000" or similar is in rules
        threshold = 10000
        if "5000" in rules:
            threshold = 5000
            
        if 'amount' in df.columns:
            # Coerce errors to NaN then fillna or dropna for comparison
            numeric_amounts = pd.to_numeric(df['amount'], errors='coerce')
            threshold_violations = df[numeric_amounts > threshold]
            for _, row in threshold_violations.iterrows():
                anomalies.append({
                    "transaction_id": row.get('transaction_id', 'Unknown'), 
                    "error": f"Amount {row.get('amount')} exceeds threshold {threshold}"
                })
                
        log_audit_event("Validation Engine", rules, f"Processed {len(df)} rows. {len(anomalies)} anomalies found.")
        
        # Save to DB
        db = read_json_db()
        db["validations"] = anomalies
        write_json_db(db)
        
        return anomalies
    except Exception as e:
        log_audit_event("Validation Engine", rules, f"Validation error: {str(e)}", "ERROR")
        print(traceback.format_exc())
        return [{"transaction_id": "System", "error": f"Validation failed due to internal error: {str(e)}"}]
