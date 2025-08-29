'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AssetForm {
  itemId: string;
  assetTag: string;
  serialNumber: string;
  location: string;
  purchaseDate: string;
  warrantyExpiry: string;
  condition: string;
  value: number;
}

export function CreateAssetDialog({ open, onOpenChange }: CreateAssetDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AssetForm>();

  const onSubmit = async (data: AssetForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating asset:', data);
    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-slate-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold gradient-text">
            Create New Asset
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemId">Item Type</Label>
              <Select onValueChange={(value) => setValue('itemId', value)}>
                <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent className="glass border-slate-700">
                  <SelectItem value="1">Dell OptiPlex 7090</SelectItem>
                  <SelectItem value="2">HP LaserJet Pro M404n</SelectItem>
                  <SelectItem value="3">Samsung 27" Monitor</SelectItem>
                  <SelectItem value="4">Office Chair Ergonomic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assetTag">Asset Tag</Label>
              <Input
                id="assetTag"
                {...register('assetTag', { required: 'Asset tag is required' })}
                placeholder="AST-001234"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.assetTag && (
                <p className="text-red-400 text-sm">{errors.assetTag.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                {...register('serialNumber', { required: 'Serial number is required' })}
                placeholder="Enter serial number"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.serialNumber && (
                <p className="text-red-400 text-sm">{errors.serialNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select onValueChange={(value) => setValue('location', value)}>
                <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="glass border-slate-700">
                  <SelectItem value="it-floor2">IT Department - Floor 2</SelectItem>
                  <SelectItem value="admin">Admin Office</SelectItem>
                  <SelectItem value="warehouse">Warehouse A</SelectItem>
                  <SelectItem value="workshop">IT Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                {...register('purchaseDate', { required: 'Purchase date is required' })}
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.purchaseDate && (
                <p className="text-red-400 text-sm">{errors.purchaseDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
              <Input
                id="warrantyExpiry"
                type="date"
                {...register('warrantyExpiry')}
                className="glass border-slate-700 focus:border-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select onValueChange={(value) => setValue('condition', value)}>
                <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent className="glass border-slate-700">
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Current Value ($)</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                {...register('value', { required: 'Current value is required', min: 0 })}
                placeholder="Enter current value"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.value && (
                <p className="text-red-400 text-sm">{errors.value.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-800">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-slate-700 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="create"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Create Asset
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}