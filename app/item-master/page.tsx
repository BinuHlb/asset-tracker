'use client';

import { motion } from 'framer-motion';
import { ItemMasterList } from '@/components/item-master/ItemMasterList';
import { ItemMasterHeader } from '@/components/item-master/ItemMasterHeader';

export default function ItemMasterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto space-y-8"
    >
      <ItemMasterHeader />
      <ItemMasterList />
    </motion.div>
  );
}