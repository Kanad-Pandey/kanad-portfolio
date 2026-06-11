import React from 'react';
import { TrendingUp, Users, Zap, Target } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
  type?: 'growth' | 'users' | 'performance' | 'precision';
}

const icons = {
  growth: <TrendingUp className="text-accent-cyan" size={20} />,
  users: <Users className="text-accent-violet" size={20} />,
  performance: <Zap className="text-yellow-400" size={20} />,
  precision: <Target className="text-green-400" size={20} />,
};

export const MetricCard = ({ label, value, description, type = 'performance' }: MetricCardProps) => {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl glass-card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">{label}</span>
        {icons[type]}
      </div>
      <div>
        <div className="text-3xl font-bold text-white font-display uppercase tracking-tight mb-1">{value}</div>
        {description && <div className="text-gray-500 text-sm leading-snug">{description}</div>}
      </div>
    </div>
  );
};
