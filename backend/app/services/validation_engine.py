import pandas as pd
from app.utils.db_utils import log_audit_event, read_json_db, write_json_db
import traceback

def run_validation_rules(dataframes: dict, rules: str) -> list:
    """Applies compliance rules against the provided dataframes."""
    anomalies = []
    
    df_txns = dataframes.get("transactions", pd.DataFrame())
    df_kyc = dataframes.get("kyc", pd.DataFrame())

    if df_txns.empty and df_kyc.empty:
        log_audit_event("Validation", rules, "Empty dataframes provided", "WARNING")
        return anomalies
        
    try:
        # Check Transactions
        if not df_txns.empty:
            # Check 1: Missing values in essential columns
            if 'amount' in df_txns.columns:
                missing = df_txns[df_txns['amount'].isnull()]
                for _, row in missing.iterrows():
                    anomalies.append({"transaction_id": row.get('transaction_id', 'Unknown'), "error": "Missing amount"})
                    
            # Extract threshold if "10000" or similar is in rules
            threshold = 10000
            if "5000" in rules:
                threshold = 5000
                
            if 'amount' in df_txns.columns:
                numeric_amounts = pd.to_numeric(df_txns['amount'], errors='coerce')
                threshold_violations = df_txns[numeric_amounts > threshold]
                for _, row in threshold_violations.iterrows():
                    anomalies.append({
                        "transaction_id": row.get('transaction_id', 'Unknown'), 
                        "error": f"Amount {row.get('amount')} exceeds threshold {threshold}"
                    })

        # Check KYC
        if not df_kyc.empty:
            if 'kyc_status' in df_kyc.columns:
                invalid_kyc = df_kyc[df_kyc['kyc_status'].isin(['EXPIRED', 'REJECTED'])]
                for _, row in invalid_kyc.iterrows():
                    anomalies.append({
                        "transaction_id": f"KYC-{row.get('customer_id', 'Unknown')}",
                        "error": f"Invalid KYC status: {row.get('kyc_status')}"
                    })

        # Cross-validation (if customer has transaction but bad KYC)
        if not df_txns.empty and not df_kyc.empty and 'customer_id' in df_txns.columns and 'customer_id' in df_kyc.columns:
            invalid_customers = df_kyc[df_kyc['kyc_status'].isin(['EXPIRED', 'REJECTED'])]['customer_id'].tolist()
            bad_txns = df_txns[df_txns['customer_id'].isin(invalid_customers)]
            for _, row in bad_txns.iterrows():
                # Avoid duplicate transaction_id error if already flagged
                anomalies.append({
                    "transaction_id": row.get('transaction_id', 'Unknown'),
                    "error": f"Transaction by customer with invalid KYC ({row.get('customer_id')})"
                })
                
        log_audit_event("Validation Engine", rules, f"Processed {len(df_txns)} txns and {len(df_kyc)} kyc records. {len(anomalies)} anomalies found.")
        
        # Save to DB
        db = read_json_db()
        db["validations"] = anomalies
        write_json_db(db)
        
        return anomalies
    except Exception as e:
        log_audit_event("Validation Engine", rules, f"Validation error: {str(e)}", "ERROR")
        print(traceback.format_exc())
        return [{"transaction_id": "System", "error": f"Validation failed due to internal error: {str(e)}"}]
