"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, Play } from 'lucide-react';

export const RunWorkflowButton = () => {
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/run-compliance-check', {
                source_text: "Target Rule: All transactions over $10000 must be reported."
            });
            alert('Workflow Triggered! The AI agent is running the process in the background. Check logs or wait a moment.');
        } catch (error) {
            alert('Error running workflow: Ensure FastAPI backend is running on port 8000.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleRun}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all flex items-center shadow-sm disabled:opacity-70">
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Agent Working...
                </>
            ) : (
                <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Compliance Check
                </>
            )}
        </button>
    );
};
