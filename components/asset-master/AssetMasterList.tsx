'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, User, Calendar, Edit, Trash2, Eye, QrCode } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

const mockAssets = [
  {
    id: '1',
    assetTag: 'AST-001234',
    serialNumber: 'DL7090X456789',
    itemName: 'Dell OptiPlex 7090',
    status: 'Active',
    location: 'IT Department - Floor 2',
    assignee: 'John Smith',
    purchaseDate: '2024-01-15',
    warrantyExpiry: '2025-01-15',
    condition: 'Excellent',
    value: 1250.00
  },
  {
    id: '2',
    assetTag: 'AST-001235',
    serialNumber: 'HP404N789123',
    itemName: 'HP LaserJet Pro M404n',
    status: 'Active',
    location: 'Admin Office',
    assignee: 'Sarah Wilson',
    purchaseDate: '2024-02-20',
    warrantyExpiry: '2025-02-20',
    condition: 'Good',
    value: 299.99
  },
  {
    id: '3',
    assetTag: 'AST-001236',
    serialNumber: 'SM27UHD456',
    itemName: 'Samsung 27" Monitor',
    status: 'Maintenance',
    location: 'IT Workshop',
    assignee: 'Unassigned',
    purchaseDate: '2024-03-10',
    warrantyExpiry: '2025-03-10',
    condition: 'Fair',
    value: 350.00
  },
  {
    id: '4',
    assetTag: 'AST-001237',
    serialNumber: 'HM-CHAIR-987',
    itemName: 'Office Chair Ergonomic',
    status: 'Disposed',
    location: 'Storage - Basement',
    assignee: 'Unassigned',
    purchaseDate: '2023-06-15',
    warrantyExpiry: '2024-06-15',
    condition: 'Poor',
    value: 450.00
  }
];

export function AssetMasterList() {
  const [loading, setLoading] = useState(true);
  const [assets] = useState(mockAssets);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Maintenance': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Disposed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {assets.map((asset, index) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass border-slate-800 hover:border-slate-700 transition-colors group">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {asset.itemName}
                    </h3>
                    <p className="text-sm text-slate-400">{asset.assetTag}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <QrCode className="w-4 h-4 text-slate-400" />
                  <span>SN: {asset.serialNumber}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{asset.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{asset.assignee}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Warranty: {asset.warrantyExpiry}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-slate-400">
                  <div>
                    <span className="font-medium">Condition:</span>
                    <p className="text-slate-300">{asset.condition}</p>
                  </div>
                  <div>
                    <span className="font-medium">Value:</span>
                    <p className="text-cyan-400 font-semibold">${asset.value.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <Button size="sm" variant="outline" className="text-xs border-slate-700 hover:bg-slate-800">
                  Generate QR
                </Button>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-800">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-800">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-800 text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}