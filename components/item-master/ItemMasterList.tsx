'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

const mockItems = [
  {
    id: '1',
    name: 'Dell OptiPlex 7090',
    sku: 'IT-COMP-001',
    category: 'Computer',
    cost: 1250.00,
    vendor: 'Dell Technologies',
    status: 'Active',
    description: 'Desktop computer with Intel i7 processor',
    specifications: 'Intel i7-11700, 16GB RAM, 512GB SSD'
  },
  {
    id: '2',
    name: 'HP LaserJet Pro M404n',
    sku: 'IT-PRIN-002',
    category: 'Printer',
    cost: 299.99,
    vendor: 'HP Inc.',
    status: 'Active',
    description: 'Monochrome laser printer',
    specifications: '38 ppm, 256MB RAM, Ethernet'
  },
  {
    id: '3',
    name: 'Samsung 27" Monitor',
    sku: 'IT-MON-003',
    category: 'Monitor',
    cost: 350.00,
    vendor: 'Samsung',
    status: 'Active',
    description: '27-inch 4K UHD monitor',
    specifications: '3840x2160, IPS, USB-C'
  },
  {
    id: '4',
    name: 'Office Chair Ergonomic',
    sku: 'OFF-CHAIR-001',
    category: 'Furniture',
    cost: 450.00,
    vendor: 'Herman Miller',
    status: 'Discontinued',
    description: 'Ergonomic office chair with lumbar support',
    specifications: 'Adjustable height, mesh back, 5-year warranty'
  }
];

export function ItemMasterList() {
  const [loading, setLoading] = useState(true);
  const [items] = useState(mockItems);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="glass border-slate-800 hover:border-slate-700 transition-colors group">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-400">{item.sku}</p>
                  </div>
                </div>
                <Badge 
                  variant={item.status === 'Active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-300">{item.description}</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <p><span className="font-medium">Category:</span> {item.category}</p>
                  <p><span className="font-medium">Vendor:</span> {item.vendor}</p>
                  <p><span className="font-medium">Cost:</span> ${item.cost.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <span className="text-lg font-semibold text-cyan-400">
                  ${item.cost.toFixed(2)}
                </span>
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