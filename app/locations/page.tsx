'use client';

import { motion } from 'framer-motion';
import { LocationManager } from '@/components/locations/LocationManager';

export default function LocationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <LocationManager />
    </motion.div>
  );
}