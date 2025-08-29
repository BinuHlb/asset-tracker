'use client';

import { motion } from 'framer-motion';
import { DashboardStats } from './DashboardStats';
import { AssetChart } from './AssetChart';
import { RecentTransactions } from './RecentTransactions';
import { ExpiringAssets } from './ExpiringAssets';

export function Dashboard() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold gradient-text">
          Asset Management Dashboard
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Monitor, track, and manage your organizational assets with real-time insights and analytics.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AssetChart />
        <RecentTransactions />
      </div>

      {/* Expiring Assets */}
      <ExpiringAssets />
    </div>
  );
}