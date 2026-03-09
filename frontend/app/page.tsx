import { DashboardCard } from '@/components/DashboardCard';
import { RunWorkflowButton } from '@/components/RunWorkflowButton';
import { Activity, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
                    <p className="text-gray-500 mt-2">Monitor, analyze, and automate compliance workflows.</p>
                </div>
                <RunWorkflowButton />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="Regulations Detected"
                    value="3"
                    description="Active rules imported"
                    icon={<Activity className="w-5 h-5 text-blue-500" />}
                />
                <DashboardCard
                    title="Violations Found"
                    value="2"
                    description="Awaiting review"
                    icon={<ShieldAlert className="w-5 h-5 text-red-500" />}
                />
                <DashboardCard
                    title="Report Status"
                    value="Pending"
                    description="Drafting in progress"
                    icon={<FileText className="w-5 h-5 text-amber-500" />}
                />
                <DashboardCard
                    title="Submission"
                    value="Success"
                    description="Last sync 2 hrs ago"
                    icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center mt-12">
                <h3 className="text-xl font-semibold mb-2 text-slate-800">Ready to run a compliance check?</h3>
                <p className="text-slate-500 max-w-lg mx-auto mb-6">
                    Paste your target regulation rules string below, or let the agent fetch the default set. Click run to start the LangChain orchestration workflow.
                </p>
            </div>
        </div>
    );
}
