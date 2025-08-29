'use client';

import { motion } from 'framer-motion';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionHeader } from '@/components/transactions/TransactionHeader';
import { TransactionStats } from '@/components/transactions/TransactionStats';

export default function TransactionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto space-y-8"
    >
      <TransactionHeader />
      <TransactionStats />
      <TransactionList />
    </motion.div>
  );
}