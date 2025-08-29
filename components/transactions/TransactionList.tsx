'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, RotateCcw, Package, Users, Trash2, Calendar, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

const mockTransactions = [
  {
    id: '1',
    type: 'Check-Out',
    assetTag: 'AST-001234',
    assetName: 'Dell OptiPlex 7090',
    user: 'John Smith',
    fromLocation: 'IT Storage',
    toLocation: 'Marketing Department',
    timestamp: '2024-01-10T10:30:00Z',
    reference: 'TXN-2024-001',
    notes: 'Assigned for quarterly project work',
    status: 'Completed'
  },
  {
    id: '2',
    type: 'Receive',
    assetTag: 'AST-001240',
    assetName: 'HP LaserJet Pro M404n',
    user: 'System Auto',
    fromLocation: 'Vendor',
    toLocation: 'Warehouse A',
    timestamp: '2024-01-10T09:15:00Z',
    reference: 'PO-2024-156',
    notes: 'New procurement from HP',
    status: 'Completed'
  },
  {
    id: '3',
    type: 'Move',
    assetTag: 'AST-001235',
    assetName: 'Samsung 27" Monitor',
    user: 'Mike Johnson',
    fromLocation: 'Floor 2 - Desk 15',
    toLocation: 'Floor 3 - Conference Room',
    timestamp: '2024-01-09T16:45:00Z',
    reference: 'TXN-2024-002',
    notes: 'Moved for meeting room setup',
    status: 'Completed'
  },
  {
    id: '4',
    type: 'Check-In',
    assetTag: 'AST-001238',
    assetName: 'Tablet iPad Pro',
    user: 'Sarah Wilson',
    fromLocation: 'Marketing Department',
    toLocation: 'IT Storage',
    timestamp: '2024-01-09T14:20:00Z',
    reference: 'TXN-2024-003',
    notes: 'Project completed, returned to pool',
    status: 'Completed'
  }
];

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'Check-Out': return { icon: ArrowUpRight, color: 'text-emerald-400' };
    case 'Check-In': return { icon: ArrowDownLeft, color: 'text-amber-400' };
    case 'Move': return { icon: RotateCcw, color: 'text-violet-400' };
    case 'Receive': return { icon: Package, color: 'text-blue-400' };
    case 'Assign': return { icon: Users, color: 'text-pink-400' };
    case 'Dispose': return { icon: Trash2, color: 'text-red-400' };
    default: return { icon: Package, color: 'text-slate-400' };
  }
};

export function TransactionList() {
  const [loading, setLoading] = useState(true);
  const [transactions] = useState(mockTransactions);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => {
        const { icon: Icon, color } = getTransactionIcon(transaction.type);
        
        return (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="glass border-slate-800 hover:border-slate-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-slate-800 ${color} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-slate-200">{transaction.assetName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                        <Badge 
                          className="text-xs bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-slate-300">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{transaction.fromLocation} → {transaction.toLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-300">
                          <User className="w-4 h-4 text-slate-400" />
                          <span>{transaction.user}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-slate-300">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      {transaction.notes && (
                        <p className="text-sm text-slate-400 italic">{transaction.notes}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <p className="text-sm font-mono text-cyan-400">{transaction.assetTag}</p>
                    <p className="text-xs text-slate-500">{transaction.reference}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}