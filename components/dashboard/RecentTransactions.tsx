'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, RotateCcw, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const transactions = [
  {
    id: '1',
    type: 'Check-Out',
    asset: 'Laptop Dell XPS 13',
    user: 'John Smith',
    location: 'IT Department',
    timestamp: '2 minutes ago',
    icon: ArrowUpRight,
    color: 'text-emerald-400'
  },
  {
    id: '2',
    type: 'Receive',
    asset: 'Monitor Samsung 27"',
    user: 'System',
    location: 'Warehouse A',
    timestamp: '15 minutes ago',
    icon: Package,
    color: 'text-blue-400'
  },
  {
    id: '3',
    type: 'Move',
    asset: 'Printer Canon MF3010',
    user: 'Mike Johnson',
    location: 'Floor 2 → Floor 3',
    timestamp: '1 hour ago',
    icon: RotateCcw,
    color: 'text-violet-400'
  },
  {
    id: '4',
    type: 'Check-In',
    asset: 'Tablet iPad Pro',
    user: 'Sarah Wilson',
    location: 'Marketing Dept',
    timestamp: '3 hours ago',
    icon: ArrowDownLeft,
    color: 'text-amber-400'
  }
];

export function RecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-200">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => {
              const Icon = transaction.icon;
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-slate-800 ${transaction.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-200">{transaction.asset}</span>
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        {transaction.user} • {transaction.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{transaction.timestamp}</span>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}