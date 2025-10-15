'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, Eye, QrCode, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data as provided in the original code
// Mock data as provided in the original code
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

// Utility function to determine status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Maintenance': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Disposed': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

// Skeleton component for loading state
const TableSkeleton = () => (
  <Table className="w-full">
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px]">
          <Skeleton className="h-4 w-[100px]" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-[150px]" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-[100px]" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-[120px]" />
        </TableHead>
        <TableHead className="text-right">
          <Skeleton className="h-4 w-[80px]" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <Skeleton className="h-4 w-[150px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[200px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[120px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// Main component for the asset table
export function ItemMasterList() {
  const [loading, setLoading] = useState(true);
  const [assets] = useState(mockAssets);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-auto"
    >
      <Table className="min-w-[800px] border-collapse border-slate-800">
        <TableHeader className="bg-slate-900 sticky top-0 z-10">
          <TableRow className="border-b border-slate-800">
            <TableHead className="w-[150px] text-slate-400">Asset Tag</TableHead>
            <TableHead className="text-slate-400">Item Name</TableHead>
            <TableHead className="text-slate-400">Status</TableHead>
            <TableHead className="text-slate-400">Assignee</TableHead>
            <TableHead className="text-slate-400">Location</TableHead>
            <TableHead className="text-right text-slate-400">Value</TableHead>
            <TableHead className="text-center text-slate-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.id} className="border-b border-slate-800 hover:bg-slate-900 transition-colors group">
              <TableCell className="font-medium text-slate-200">{asset.assetTag}</TableCell>
              <TableCell className="text-slate-300">{asset.itemName}</TableCell>
              <TableCell>
                <Badge className={`text-xs font-medium ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-300">{asset.assignee}</TableCell>
              <TableCell className="text-slate-300">{asset.location}</TableCell>
              <TableCell className="text-right text-cyan-400 font-semibold">${asset.value.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0 data-[state=open]:bg-slate-800"
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px] bg-slate-900 border-slate-700">
                    <DropdownMenuLabel className="text-slate-400">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="flex items-center space-x-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 cursor-pointer">
                      <Eye className="w-4 h-4" />
                      <span>View details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 text-slate-300 hover:bg-slate-800 hover:text-yellow-400 cursor-pointer">
                      <Edit className="w-4 h-4" />
                      <span>Edit asset</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 text-slate-300 hover:bg-slate-800 hover:text-purple-400 cursor-pointer">
                      <QrCode className="w-4 h-4" />
                      <span>Generate QR Code</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="flex items-center space-x-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                      <span>Delete asset</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}