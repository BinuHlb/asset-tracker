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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ItemForm {
  name: string;
  sku: string;
  category: string;
  cost: number;
  vendor: string;
  description: string;
  specifications: string;
}

export function CreateItemDialog({ open, onOpenChange }: CreateItemDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ItemForm>();

  const onSubmit = async (data: ItemForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating item:', data);
    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-slate-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold gradient-text">
            Create New Item
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Item name is required' })}
                placeholder="Enter item name"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                {...register('sku', { required: 'SKU is required' })}
                placeholder="Enter SKU"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.sku && (
                <p className="text-red-400 text-sm">{errors.sku.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue('category', value)}>
                <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass border-slate-700">
                  <SelectItem value="computer">Computer</SelectItem>
                  <SelectItem value="printer">Printer</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="network">Network Equipment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cost">Cost ($)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                {...register('cost', { required: 'Cost is required', min: 0 })}
                placeholder="Enter cost"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.cost && (
                <p className="text-red-400 text-sm">{errors.cost.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                {...register('vendor', { required: 'Vendor is required' })}
                placeholder="Enter vendor name"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.vendor && (
                <p className="text-red-400 text-sm">{errors.vendor.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Enter item description"
                className="glass border-slate-700 focus:border-cyan-500 min-h-20"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="specifications">Specifications</Label>
              <Textarea
                id="specifications"
                {...register('specifications')}
                placeholder="Enter technical specifications"
                className="glass border-slate-700 focus:border-cyan-500 min-h-20"
              />
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
                    Create Item
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