"use client";
import React, { useEffect, useState } from 'react';
import { fetchCalendar } from '@/services/api';
import { Calendar } from 'lucide-react';

export default function CalendarPage() {
    const [events, setEvents] = useState<any[]>([]);

    const loadData = async () => {
        try {
            const data = await fetchCalendar();
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { loadData(); }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <Calendar className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Regulatory Calendar</h1>
                    <p className="text-gray-500 text-sm mt-1">Extracted obligations requiring action</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rule</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Frequency</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Conditions</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {events.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No obligations found yet. Run the workflow.</td></tr>
                        ) : events.map((e, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">#{e.id}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{e.reporting_rule}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md text-xs">{e.reporting_frequency}</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-mono text-red-600 bg-red-50/50">{e.threshold_conditions}</td>
                                <td className="px-6 py-4 text-sm font-medium text-blue-600">{e.deadline}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={loadData} className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold underline decoration-transparent hover:decoration-blue-600 transition-all underline-offset-4">Refresh Data</button>
        </div>
    );
}
