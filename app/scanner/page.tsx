'use client';

import { motion } from 'framer-motion';
import { ScannerInterface } from '@/components/scanner/ScannerInterface';

export default function ScannerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <ScannerInterface />
    </motion.div>
  );
}