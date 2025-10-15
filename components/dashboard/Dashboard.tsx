'use client';

import { motion } from 'framer-motion';
import { DashboardStats } from './DashboardStats';
import { AssetChart } from './AssetChart';
import { RecentTransactions } from './RecentTransactions';
import { ExpiringAssets } from './ExpiringAssets';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../ui/table';
const assetData = [
  { id: 'A001', name: 'Laptop Dell XPS', status: 'Active', location: 'NY Office' },
  { id: 'A002', name: 'Projector Epson', status: 'Expiring', location: 'London' },
  { id: 'A003', name: 'Office Chair', status: 'Active', location: 'Dubai' },
];

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
       {/* Assets Table */}
      <div>
        <Table>
          <TableCaption>A list of your organizational assets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetData.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.status}</TableCell>
                <TableCell>{asset.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}