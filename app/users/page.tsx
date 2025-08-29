'use client';

import { motion } from 'framer-motion';
import { UserManagement } from '@/components/users/UserManagement';

export default function UsersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl mx-auto"
    >
      <UserManagement />
    </motion.div>
  );
}