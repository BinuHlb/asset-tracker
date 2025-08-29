'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateTransactionDialog } from './CreateTransactionDialog';

export function TransactionHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Asset Transactions</h1>
          <p className="text-slate-400 mt-2">
            Track all asset movements, assignments, and lifecycle events
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Transaction
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search transactions by asset, user, or reference..."
            className="pl-10 glass border-slate-700 focus:border-cyan-500"
          />
        </div>
        <div className="flex space-x-3">
          <Select>
            <SelectTrigger className="w-40 glass border-slate-700">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent className="glass border-slate-700">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="receive">Receive</SelectItem>
              <SelectItem value="move">Move</SelectItem>
              <SelectItem value="checkout">Check-Out</SelectItem>
              <SelectItem value="checkin">Check-In</SelectItem>
              <SelectItem value="assign">Assign</SelectItem>
              <SelectItem value="dispose">Dispose</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <CreateTransactionDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog} 
      />
    </div>
  );
}