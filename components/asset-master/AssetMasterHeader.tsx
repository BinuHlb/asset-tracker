'use client';

import { useState } from 'react';
import { Plus, Search, Filter, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateAssetDialog } from './CreateAssetDialog';

export function AssetMasterHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Asset Master</h1>
          <p className="text-slate-400 mt-2">
            Track and manage individual assets with serial numbers, locations, and assignments
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <QrCode className="w-4 h-4 mr-2" />
            Scan Asset
          </Button>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          
          <Input
            placeholder="Search assets by serial number, tag, or assignee..."
            className="pl-10 glass border-slate-700 focus:border-cyan-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <CreateAssetDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
}