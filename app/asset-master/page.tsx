'use client';

import { motion } from 'framer-motion';
import { AssetMasterList } from '@/components/asset-master/AssetMasterList';
import { AssetMasterHeader } from '@/components/asset-master/AssetMasterHeader';

export default function AssetMasterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto space-y-8"
    >
      <AssetMasterHeader />
      <AssetMasterList />
    </motion.div>
  );
}