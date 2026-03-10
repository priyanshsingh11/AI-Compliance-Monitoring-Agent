import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Activity, Calendar, FileText, LayoutGrid, ShieldAlert, List } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={`${inter.className} flex p-6 h-screen bg-[#111317] text-white antialiased overflow-hidden`}>
                {/* Floating Pill Sidebar */}
                <div className="w-20 my-3 ml-6 bg-[#1a1d24] rounded-[2rem] flex flex-col items-center py-8 shadow-2xl z-20 border border-white/5 relative">
                    {/* Top Logo / App Icon */}
                    <div className="mb-8 mt-2 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Activity className="w-5 h-5" />
                    </div>

                    {/* Navigation Icons */}
                    <nav className="flex-1 flex flex-col space-y-6 w-full items-center">
                        <Link href="/" className="w-12 h-12 rounded-full bg-[#2d323e] flex items-center justify-center text-white shadow-md transition-all hover:scale-105" title="Dashboard">
                            <LayoutGrid className="w-5 h-5" />
                        </Link>
                        <Link href="/calendar" className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" title="Calendar">
                            <Calendar className="w-5 h-5" />
                        </Link>
                        <Link href="/validation" className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" title="Validations">
                            <ShieldAlert className="w-5 h-5" />
                        </Link>
                        <Link href="/report" className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" title="Reports">
                            <FileText className="w-5 h-5" />
                        </Link>
                        <Link href="/audit" className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all" title="Audit Log">
                            <List className="w-5 h-5" />
                        </Link>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col w-full h-full relative pl-6">
                    {/* Top Header matching reference */}
                    <header className="h-28 flex justify-between items-end pb-4 pr-10 pl-4 shrink-0">
                        <div className="mb-2">
                            <div className="flex items-center gap-3">
                                <Activity className="w-8 h-8 text-emerald-500 hidden" />
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Hello, Admin!</h1>
                                    <p className="text-[#8e95a5] text-sm">Explore information and activity about your compliance</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content Dashboard */}
                    <main className="flex-1 overflow-auto pr-10 pl-4 pb-10 custom-scrollbar">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
