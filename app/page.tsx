'use client';

import { motion } from 'framer-motion';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Dashboard />
    </motion.div>
  );
}