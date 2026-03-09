"use client";
import React, { useEffect, useState } from 'react';
import { fetchAuditLog } from '@/services/api';
import { Activity, Terminal } from 'lucide-react';

export default function AuditPage() {
    const [logs, setLogs] = useState<any[]>([]);

    const loadData = async () => {
        try {
            const data = await fetchAuditLog();
            setLogs(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { loadData(); }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-slate-900 rounded-lg text-green-400">
                        <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">System Audit Log</h1>
                        <p className="text-gray-500 text-sm mt-1">Immutable read-only chain of AI agent events</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-700 overflow-hidden text-slate-300 font-mono text-sm">
                <div className="bg-black/40 px-6 py-4 border-b border-slate-800 flex justify-between">
                    <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Audit Trail - Secure Console</span>
                    <span className="text-xs text-green-500 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Tracking Active
                    </span>
                </div>
                <div className="p-6 overflow-x-auto max-h-[600px] overflow-y-auto">
                    {logs.length === 0 ? (
                        <div className="text-slate-600 py-10 text-center flex flex-col items-center">
                            <Activity className="w-10 h-10 mb-4 opacity-20" />
                            Awaiting workflow execution...
                        </div>
                    ) : (
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase tracking-widest">
                                    <th className="pb-3 px-4 font-semibold">Timestamp (UTC)</th>
                                    <th className="pb-3 px-4 font-semibold">Agent Component Tool</th>
                                    <th className="pb-3 px-4 font-semibold">I/O Signature</th>
                                    <th className="pb-3 px-4 text-right font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {logs.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                                        <td className="py-4 px-4 text-blue-400 font-semibold">{log.step}</td>
                                        <td className="py-4 px-4 text-slate-400 max-w-md truncate" title={`IN: ${log.input}\nOUT: ${log.output}`}>
                                            <div className="truncate"><span className="text-slate-600">IN:</span> {log.input}</div>
                                            <div className="truncate mt-1"><span className="text-slate-600">OUT:</span> {log.output}</div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className={(log.status === 'ERROR' || log.status === 'WARNING') ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                                                [{log.status}]
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <button onClick={loadData} className="mt-4 text-sm text-slate-500 hover:text-slate-800 font-semibold underline decoration-transparent hover:decoration-slate-500 transition-all underline-offset-4">Refresh Logs</button>
        </div>
    );
}
