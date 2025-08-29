'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DivideIcon as LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: typeof LucideIcon;
  color: string;
}

export function StatsCard({ title, value, change, trend, icon: Icon, color }: StatsCardProps) {
  return (
    <Card className="glass border-slate-800 overflow-hidden group hover:border-slate-700 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <motion.p 
              className="text-3xl font-bold text-slate-100"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {value}
            </motion.p>
            <div className="flex items-center space-x-1">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} opacity-80 group-hover:opacity-100 transition-opacity`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}