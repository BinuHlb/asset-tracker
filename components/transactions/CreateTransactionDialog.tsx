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

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TransactionForm {
  type: string;
  assetTag: string;
  user: string;
  fromLocation: string;
  toLocation: string;
  notes: string;
}

export function CreateTransactionDialog({ open, onOpenChange }: CreateTransactionDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TransactionForm>();
  
  const selectedType = watch('type');

  const onSubmit = async (data: TransactionForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating transaction:', data);
    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-slate-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold gradient-text">
            New Asset Transaction
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select onValueChange={(value) => setValue('type', value)}>
                <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent className="glass border-slate-700">
                  <SelectItem value="receive">Receive</SelectItem>
                  <SelectItem value="move">Move</SelectItem>
                  <SelectItem value="checkout">Check-Out</SelectItem>
                  <SelectItem value="checkin">Check-In</SelectItem>
                  <SelectItem value="assign">Assign</SelectItem>
                  <SelectItem value="dispose">Dispose</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="bundle">Bundle</SelectItem>
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
              <Label htmlFor="user">User/Assignee</Label>
              <Input
                id="user"
                {...register('user', { required: 'User is required' })}
                placeholder="Enter user name"
                className="glass border-slate-700 focus:border-cyan-500"
              />
              {errors.user && (
                <p className="text-red-400 text-sm">{errors.user.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromLocation">From Location</Label>
              <Select onValueChange={(value) => setValue('fromLocation', value)}>
                <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                  <SelectValue placeholder="Select from location" />
                </SelectTrigger>
                <SelectContent className="glass border-slate-700">
                  <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                  <SelectItem value="it-storage">IT Storage</SelectItem>
                  <SelectItem value="floor2-desk15">Floor 2 - Desk 15</SelectItem>
                  <SelectItem value="conference-room">Conference Room</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedType !== 'dispose' && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="toLocation">To Location</Label>
                <Select onValueChange={(value) => setValue('toLocation', value)}>
                  <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                    <SelectValue placeholder="Select to location" />
                  </SelectTrigger>
                  <SelectContent className="glass border-slate-700">
                    <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                    <SelectItem value="it-department">IT Department</SelectItem>
                    <SelectItem value="marketing-dept">Marketing Department</SelectItem>
                    <SelectItem value="floor3-conf">Floor 3 - Conference Room</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Enter transaction notes (optional)"
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
                    <span>Processing...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="create"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Create Transaction
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