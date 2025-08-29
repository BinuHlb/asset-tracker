'use client';

import { motion } from 'framer-motion';
import { Calendar, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const expiringAssets = [
  {
    id: '1',
    name: 'Laptop Lenovo ThinkPad',
    serialNumber: 'LT-2021-001',
    expiryDate: '2025-01-15',
    location: 'IT Department',
    assignee: 'John Doe',
    daysLeft: 5,
    severity: 'high'
  },
  {
    id: '2',
    name: 'Software License Office 365',
    serialNumber: 'SW-2024-456',
    expiryDate: '2025-01-22',
    location: 'Company-wide',
    assignee: 'IT Admin',
    daysLeft: 12,
    severity: 'medium'
  },
  {
    id: '3',
    name: 'Router Cisco 2900',
    serialNumber: 'NW-2020-789',
    expiryDate: '2025-02-01',
    location: 'Server Room',
    assignee: 'Network Team',
    daysLeft: 22,
    severity: 'low'
  }
];

export function ExpiringAssets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-200 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Assets Expiring Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expiringAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-slate-200">{asset.name}</h3>
                    <Badge 
                      variant={asset.severity === 'high' ? 'destructive' : 
                              asset.severity === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {asset.daysLeft} days
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>Serial: {asset.serialNumber}</p>
                    <p>Assignee: {asset.assignee} • Location: {asset.location}</p>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Expires: {asset.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="ml-4">
                  Renew
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}