import React from 'react';

interface DashboardCardProps {
    title: string;
    value: string | number;
    description: string;
    icon?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">{title}</h3>
            <div className="text-3xl font-bold text-slate-800 my-3">{value}</div>
            <p className="text-sm text-slate-400 font-medium">{description}</p>
        </div>
    );
}
