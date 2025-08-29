'use client';

import { motion } from 'framer-motion';
import { Package, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/ui/StatsCard';

const stats = [
  {
    title: 'Total Assets',
    value: '2,847',
    change: '+12%',
    trend: 'up',
    icon: Shield,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Active Items',
    value: '456',
    change: '+3%',
    trend: 'up',
    icon: Package,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    title: 'In Transit',
    value: '23',
    change: '-8%',
    trend: 'down',
    icon: TrendingUp,
    color: 'from-violet-500 to-purple-500'
  },
  {
    title: 'Expiring Soon',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-500'
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
}