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
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                        <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">System Audit Log</h1>
                        <p className="text-[#8e95a5] text-sm mt-1">Immutable read-only chain of AI agent events</p>
                    </div>
                </div>
                <button onClick={loadData} className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 transition-all">
                    Refresh Logs
                </button>
            </div>

            <div className="bg-[#1a1d24] rounded-2xl shadow-xl border border-white/5 overflow-hidden text-slate-300 font-mono text-sm">
                <div className="bg-[#111317] px-6 py-4 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-bold tracking-wider text-[#8e95a5] uppercase">Audit Trail - Secure Console</span>
                    <span className="text-xs text-emerald-500 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Tracking Active
                    </span>
                </div>
                <div className="p-0 overflow-x-auto max-h-[650px] overflow-y-auto custom-scrollbar">
                    {logs.length === 0 ? (
                        <div className="text-slate-600 py-20 text-center flex flex-col items-center">
                            <Activity className="w-10 h-10 mb-4 opacity-20 text-emerald-500" />
                            <span className="text-[#8e95a5]">Awaiting workflow execution...</span>
                        </div>
                    ) : (
                        <table className="min-w-full text-left">
                            <thead className="bg-[#1a1d24] sticky top-0 z-10">
                                <tr className="border-b border-white/5 text-[#8e95a5] text-xs uppercase tracking-widest">
                                    <th className="py-4 px-6 font-semibold">Timestamp (Local)</th>
                                    <th className="py-4 px-6 font-semibold">Agent Component Tool</th>
                                    <th className="py-4 px-6 font-semibold">I/O Signature</th>
                                    <th className="py-4 px-6 text-right font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {logs.map((log, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-5 px-6 text-xs text-[#8e95a5] whitespace-nowrap">{
                                            log.timestamp.includes('T') ? log.timestamp.replace('T', ' ').substring(0, 19) : log.timestamp
                                        }</td>
                                        <td className="py-5 px-6 text-emerald-400/90 font-semibold text-xs tracking-wide">{log.step}</td>
                                        <td className="py-5 px-6 text-slate-400 max-w-md" title={`IN: ${log.input}\nOUT: ${log.output}`}>
                                            <div className="truncate mb-1"><span className="text-slate-600 text-[10px] mr-2">IN</span><span className="text-slate-300">{log.input}</span></div>
                                            <div className="truncate"><span className="text-slate-600 text-[10px] mr-2">OUT</span><span className="text-emerald-100/70">{log.output}</span></div>
                                        </td>
                                        <td className="py-5 px-6 text-right">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider ${(log.status === 'ERROR' || log.status === 'WARNING')
                                                    ? "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                                                    : "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                                                }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
