"use client";
import React, { useEffect, useState } from 'react';
import { fetchValidations } from '@/services/api';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export default function ValidationPage() {
    const [results, setResults] = useState<any[]>([]);

    const loadData = async () => {
        try {
            const data = await fetchValidations();
            setResults(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { loadData(); }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-100 rounded-lg text-red-600">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Validation Results</h1>
                        <p className="text-gray-500 text-sm mt-1">Rule engine cross-checks and threshold failures recorded by Pandas</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Violation Error</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Severity</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {results.length === 0 ? (
                            <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No violations recorded.</td></tr>
                        ) : results.map((r, idx) => (
                            <tr key={idx} className="hover:bg-red-50/40 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.transaction_id}</td>
                                <td className="px-6 py-4 text-sm text-red-600 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2 opacity-50 text-red-500" />
                                    {r.error}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded">High</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={loadData} className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold underline decoration-transparent hover:decoration-blue-600 transition-all underline-offset-4">Refresh Data</button>
        </div>
    );
}
