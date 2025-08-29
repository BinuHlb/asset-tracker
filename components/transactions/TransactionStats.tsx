'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, RotateCcw, Package, Users, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const transactionStats = [
  { type: 'Received', count: 45, icon: Package, color: 'from-emerald-500 to-teal-500' },
  { type: 'Check-Out', count: 23, icon: ArrowUpRight, color: 'from-blue-500 to-cyan-500' },
  { type: 'Check-In', count: 18, icon: ArrowDownLeft, color: 'from-violet-500 to-purple-500' },
  { type: 'Moved', count: 12, icon: RotateCcw, color: 'from-amber-500 to-orange-500' },
  { type: 'Assigned', count: 8, icon: Users, color: 'from-pink-500 to-rose-500' },
  { type: 'Disposed', count: 3, icon: Trash2, color: 'from-red-500 to-red-600' },
];

export function TransactionStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {transactionStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass border-slate-800 hover:border-slate-700 transition-colors">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-200">{stat.count}</p>
                <p className="text-sm text-slate-400">{stat.type}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}