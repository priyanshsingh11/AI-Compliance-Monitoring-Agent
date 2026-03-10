"use client";
import { DashboardCard } from '@/components/DashboardCard';
import { RunWorkflowButton } from '@/components/RunWorkflowButton';
import { Activity, ShieldAlert, FileText, CheckCircle, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Fingerprint, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        regulations: 0,
        violations: 0,
        report_status: "Pending",
        submission: "Pending"
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:8000/dashboard-stats');
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-6 animate-in fade-in duration-700">
            {/* --- TOP ROW --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">

                {/* Rules Monitored */}
                <DashboardCard
                    title="Rules Monitored"
                    value={stats.regulations.toString()}
                    className="col-span-1 h-52 group border-t-2 border-t-emerald-500/20 relative overflow-hidden"
                >
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 z-0"></div>
                    <div className="absolute right-6 bottom-6 flex items-end gap-1.5 h-16 z-10">
                        <div className="w-2 h-8 bg-emerald-500/20 rounded-full group-hover:h-12 transition-all duration-300"></div>
                        <div className="w-2 h-12 bg-emerald-500/50 rounded-full group-hover:h-8 transition-all duration-300 delay-75"></div>
                        <div className="w-2 h-10 bg-emerald-500 rounded-full group-hover:h-14 transition-all duration-300 delay-150"></div>
                        <div className="w-2 h-16 bg-emerald-400 rounded-full group-hover:h-10 transition-all duration-300 delay-200"></div>
                    </div>
                </DashboardCard>

                {/* Violations */}
                <DashboardCard
                    title="Active Violations"
                    value={stats.violations.toString()}
                    className="col-span-1 h-52 group border-t-2 border-t-rose-500/20 overflow-hidden relative"
                >
                    <div className="absolute -left-10 -top-10 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 z-0"></div>
                    <div className="absolute top-6 right-6 w-12 h-12 bg-[#2d323e] rounded-xl flex items-center justify-center rotate-3 group-hover:-rotate-3 transition-transform duration-300 shadow-xl z-10 border border-white/5">
                        <Users className="w-6 h-6 text-rose-400" />
                    </div>
                    <svg className="absolute -right-4 -bottom-4 w-full h-32 text-rose-500/40 group-hover:text-rose-500/60 transition-colors duration-500 z-0 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path d="M0,50 Q20,10 40,40 T100,20 L100,50 Z" fill="currentColor" opacity="0.1" />
                        <path d="M0,50 Q20,10 40,40 T100,20" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                </DashboardCard>

                {/* Report Generation */}
                <DashboardCard
                    title="Report Status"
                    value={stats.report_status}
                    className="col-span-1 h-52 group border-t-2 border-t-amber-500/20 relative"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"></div>
                    <div className="absolute top-6 right-6 w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(245,158,11,0.2)] z-10 border border-amber-500/20">
                        <FileText className="w-6 h-6 text-amber-500" />
                    </div>
                    {/* Faux Document lines */}
                    <div className="absolute right-6 bottom-6 flex flex-col gap-2.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300 z-0 pointer-events-none">
                        <div className="w-24 h-2 bg-white/40 rounded-full"></div>
                        <div className="w-16 h-2 bg-white/40 rounded-full"></div>
                        <div className="w-20 h-2 bg-white/40 rounded-full"></div>
                    </div>
                </DashboardCard>

                {/* Submission */}
                <DashboardCard
                    variant="secondary"
                    title="Compliance Sync"
                    value={stats.submission}
                    className="col-span-1 h-52 group border-t-2 border-t-emerald-300/30 overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent z-0 pointer-events-none"></div>
                    <svg className="absolute right-0 bottom-0 w-full h-24 text-emerald-300 opacity-60 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000 origin-bottom z-0 pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path d="M0,40 Q25,10 50,30 T100,20 L100,50 L0,50 Z" fill="currentColor" opacity="0.2" />
                        <path d="M0,40 Q25,10 50,30 T100,20" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <path d="M0,45 Q25,20 50,35 T100,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" vectorEffect="non-scaling-stroke" />
                    </svg>
                </DashboardCard>

            </div>

            {/* --- BOTTOM ROW --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-[340px]">

                {/* Active Connected Data Sources */}
                <div className="col-span-1 md:col-span-2 h-full bg-gradient-to-br from-[#1e232c] to-[#14161b] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-2xl group border-t-2 border-t-indigo-500/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent z-0 pointer-events-none"></div>
                    <div className="absolute -top-40 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>

                    <div className="z-20 w-3/5 h-full flex flex-col justify-center">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 border border-white/10 text-[10px] font-medium text-white/70 mb-4 w-fit backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            System Online
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white mb-3 leading-tight">Active Connected<br />Data Sources</h3>
                        <p className="text-xs text-[#8e95a5] leading-relaxed mb-6 font-medium">
                            Securely scanning internal databases, KYC records, and transactional APIs in real-time. Automated ingestion pipelines active and monitored 24/7.
                        </p>
                        <button className="bg-white text-black hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] px-4 py-2 text-sm rounded-xl font-bold transition-all duration-300 w-fit flex items-center gap-2 group/btn z-20">
                            Add New Source
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Stacked Faux Cards Graphic */}
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 transform rotate-[-12deg] group-hover:rotate-[-5deg] transition-all duration-700 hover:scale-[1.03] z-10 w-[300px] h-[190px] pointer-events-none">
                        {/* Back Card */}
                        <div className="w-[260px] h-[160px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 absolute top-8 left-8 opacity-40 backdrop-blur-3xl"></div>

                        {/* Middle Card */}
                        <div className="w-[260px] h-[160px] bg-gradient-to-br from-indigo-900 to-[#111827] rounded-3xl shadow-2xl border border-indigo-500/30 absolute top-4 left-4 p-5 flex flex-col justify-between backdrop-blur-xl group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-semibold text-indigo-300 tracking-wider">KYC_RECORDS_DB</span>
                                <div className="w-6 h-4 bg-indigo-500/20 rounded-full flex items-center justify-end px-1 border border-indigo-500/30"><div className="w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div></div>
                            </div>
                            <div className="font-mono tracking-widest text-indigo-200/50 text-sm mt-3 font-medium">**** **** **** 8821</div>
                        </div>

                        {/* Front Card */}
                        <div className="w-[260px] h-[160px] bg-[rgba(255,255,255,0.05)] backdrop-blur-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-emerald-500/40 absolute top-0 left-0 p-5 flex flex-col justify-between group-hover:-translate-y-4 group-hover:translate-x-4 transition-transform duration-500 overflow-hidden backdrop-saturate-200">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none"></div>

                            <div className="flex justify-between items-start relative z-10">
                                <span className="text-[10px] font-bold text-white tracking-widest uppercase drop-shadow-md">TRANSACTIONS_API</span>
                                <div className="p-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30 backdrop-blur-md">
                                    <Activity className="text-emerald-400 w-4 h-4 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <div className="font-mono tracking-[0.15em] text-white text-sm mt-3 drop-shadow-md font-medium">SYNC **** **** 1024</div>
                                <div className="flex justify-between mt-4 text-[8px] text-emerald-100/70 tracking-widest font-bold">
                                    <span>FREQ: REAL-TIME</span>
                                    <span className="flex items-center gap-1"><div className="w-1 h-1 bg-emerald-400 rounded-full"></div>STATUS: OK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Events */}
                <DashboardCard className="col-span-1 h-full pt-6 !p-0 flex flex-col border-t-2 border-t-white/5 rounded-3xl bg-gradient-to-b from-[#1a1d24] to-[#14161b]">
                    <div className="p-5 pb-2 border-b border-white/5 shrink-0 z-10 flex items-center">
                        <h3 className="text-x tracking-wide font-medium text-[#8e95a5]">Recent Events</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 custom-scrollbar z-10">
                        {[
                            { title: 'Data Collection', time: 'Today, 14:34', status: 'Parsed', color: 'emerald', icon: Search },
                            { title: 'Validation Hit', time: 'Today, 15:23', status: 'Error', color: 'rose', icon: ShieldAlert },
                            { title: 'Report Created', time: 'Today, 17:54', status: 'Saved', color: 'emerald', icon: FileText },
                            { title: 'System Scan', time: 'Yesterday, 09:00', status: 'Clean', color: 'indigo', icon: Activity },
                        ].map((event, i) => (
                            <div key={i} className="flex items-center justify-between group/item p-2.5 rounded-2xl hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 ${event.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 group-hover/item:bg-emerald-500/20' :
                                        event.color === 'rose' ? 'bg-rose-500/10 text-rose-400 group-hover/item:bg-rose-500/20' :
                                            'bg-indigo-500/10 text-indigo-400 group-hover/item:bg-indigo-500/20'
                                        }`}>
                                        <event.icon className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white font-bold group-hover/item:text-white transition-colors tracking-tight">{event.title}</p>
                                        <p className="text-[10px] text-[#8e95a5] font-medium mt-0.5">{event.time}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border shadow-sm ${event.color === 'emerald' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                                    event.color === 'rose' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
                                        'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                                    }`}>{event.status}</span>
                            </div>
                        ))}
                    </div>
                </DashboardCard>

                {/* Security Setup (Run Workflow Button) */}
                <DashboardCard className="col-span-1 h-full flex flex-col justify-center items-center text-center border-t-2 border-t-white/10 rounded-3xl bg-gradient-to-t from-[#14161b] to-[#1a1d24] relative group">
                    {/* Background glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-500/5 blur-3xl rounded-full z-0 group-hover:bg-emerald-500/10 transition-colors duration-700 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center p-3">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a1d24] to-[#2d323e] flex items-center justify-center mb-5 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.1)] border border-emerald-500/20 group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(52,211,153,0.25)] transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Fingerprint className="w-6 h-6 relative z-10 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Keep you safe!</h3>
                        <p className="text-xs border-white text-[#8e95a5] mb-8 font-medium px-2 leading-relaxed">
                            Update your security status by running a new regulatory scan.
                        </p>
                        <div className="w-full shrink-0 flex justify-center scale-100 group-hover:scale-[1.05] transition-transform duration-500">
                            <RunWorkflowButton />
                        </div>
                    </div>
                </DashboardCard>

            </div>
        </div>
    );
}
