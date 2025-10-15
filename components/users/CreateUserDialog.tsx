// modules/transactions/CreateTransactionDialog.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateDialog } from '@/components/common/CreateDialog';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserForm {
  type: string;
  assetTag: string;
  user: string;
  fromLocation: string;
  toLocation: string;
  notes: string;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<UserForm>();

  const selectedType = watch('type');

  const onSubmit = async (data: UserForm) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // fake API
    console.log('Creating transaction:', data);
    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  return (
    <CreateDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Asset User"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Fields go here */}
      <div className="space-y-2">
        <Label>Transaction Type</Label>
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
        <Label>Asset Tag</Label>
        <Input
          {...register('assetTag', { required: 'Asset tag is required' })}
          placeholder="AST-001234"
          className="glass border-slate-700 focus:border-cyan-500"
        />
        {errors.assetTag && <p className="text-red-400 text-sm">{errors.assetTag.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>User/Assignee</Label>
        <Input
          {...register('user', { required: 'User is required' })}
          placeholder="Enter user name"
          className="glass border-slate-700 focus:border-cyan-500"
        />
        {errors.user && <p className="text-red-400 text-sm">{errors.user.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>From Location</Label>
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
          <Label>To Location</Label>
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
        <Label>Notes</Label>
        <Textarea
          {...register('notes')}
          placeholder="Enter transaction notes (optional)"
          className="glass border-slate-700 focus:border-cyan-500 min-h-20"
        />
      </div>
    </CreateDialog>
  );
}
