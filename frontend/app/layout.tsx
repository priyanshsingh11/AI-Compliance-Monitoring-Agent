import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Activity, Calendar, FileText, Home, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
    title: 'AI Compliance Agent',
    description: 'AI-driven Compliance Monitoring Prototype',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
                    <div className="p-6">
                        <h1 className="text-xl font-bold tracking-tight text-blue-400">AI Compliance</h1>
                        <p className="text-xs text-slate-400 mt-1">Monitoring Agent</p>
                    </div>
                    <nav className="flex-1 mt-4 space-y-2 px-4">
                        <Link href="/" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                            <Home className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="font-medium text-sm">Dashboard</span>
                        </Link>
                        <Link href="/calendar" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                            <Calendar className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="font-medium text-sm">Calendar</span>
                        </Link>
                        <Link href="/validation" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                            <ShieldAlert className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="font-medium text-sm">Validations</span>
                        </Link>
                        <Link href="/report" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                            <FileText className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="font-medium text-sm">Reports</span>
                        </Link>
                        <Link href="/audit" className="flex items-center px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                            <Activity className="w-5 h-5 mr-3 text-slate-400" />
                            <span className="font-medium text-sm">Audit Log</span>
                        </Link>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
                    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">Compliance Workspace</h2>
                    </header>
                    <main className="flex-1 overflow-auto p-8 relative">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
