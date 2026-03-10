"use client";
import React, { useEffect, useState } from 'react';
import { fetchReport } from '@/services/api';
import { FileText, Send } from 'lucide-react';

export default function ReportPage() {
    const [report, setReport] = useState<any>(null);

    const loadData = async () => {
        try {
            const data = await fetchReport();
            setReport(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { loadData(); }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Compliance Report</h1>
                        <p className="text-gray-500 text-sm mt-1">LangChain generated markdown output</p>
                    </div>
                </div>
                {report && report.status === "Submitted" && (
                    <div className="flex items-center text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
                        <Send className="w-4 h-4 mr-2" /> Officially Submitted
                    </div>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 className="font-mono text-sm text-gray-600 font-semibold">Report #{report?.report_id || '---'}</h3>
                    <div className="text-xs text-gray-400 font-mono">Status: {report?.status || 'Pending'}</div>
                </div>
                <div className="p-8 pb-10 min-h-[400px]">
                    {!report || !report.content ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 mt-20">
                            <FileText className="w-12 h-12 mb-4 opacity-20" />
                            <p>No report generated yet. Run the Compliance Agent workflow first.</p>
                        </div>
                    ) : (
                        <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 leading-relaxed max-w-none">
                            {report.content}
                        </pre>
                    )}
                </div>
                {report && report.status === "Ready for Review" && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end gap-4">
                        <button onClick={loadData} className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all">
                            Reject & Reload
                        </button>
                        <button
                            onClick={async () => {
                                try {
                                    await fetch('http://localhost:8000/submit-report', { method: 'POST' });
                                    loadData();
                                } catch (e) {
                                    console.error(e);
                                    alert("Submission failed during mock API attempt.");
                                }
                            }}
                            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 transition-all flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            Approve & Submit
                        </button>
                    </div>
                )}
            </div>

            <button onClick={loadData} className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold underline decoration-transparent hover:decoration-blue-600 transition-all underline-offset-4">Refresh Report</button>
        </div>
    );
}
