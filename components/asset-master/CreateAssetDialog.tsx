'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Controller } from "react-hook-form";
import { DatePicker } from "./../ui/datepicker"; // Assuming you have a DatePicker component
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
import { Textarea } from '@/components/ui/textarea'; // Import Textarea for Notes field
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox for flag fields

interface CreateAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AssetForm {
  assetId: string; // Auto-generated
  assetItemId: string;
  serialNumber: string;
  siteId: string;
  statusId: string;
  quantity: number;
  locationCategoryId: string;
  location: string;
  subLocation: string;
  level: string;
  slot: string;
  acquiredUnderId: string;
  conversion: string;
  addedDate: string;
  expiryDate: string;
  warrantyExpiry: string;
  calibrationDue: string;
  batchNo: string;
  blackListed: boolean;
  markFlag: boolean;
  markFavorite: boolean;
  totalInventoryCost: number;
  model: string;
  manufacturingCompany: string;
  assigneeId: string;
  notes: string;
  barcode: string;
}

export function CreateAssetDialog({ open, onOpenChange }: CreateAssetDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    watch, 
    control, 
    formState: { errors } 
  } = useForm<AssetForm>({
    defaultValues: {
      quantity: 1, // Default quantity to 1
      blackListed: false,
      markFlag: false,
      markFavorite: false,
      totalInventoryCost: 0,
    }
  });

  const onSubmit = async (data: AssetForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating asset:', data);
    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  // Get the current value of the quantity field
  const quantity = watch('quantity');
  const [qrImages, setQrImages] = useState<string[]>([]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold gradient-text">
            Create New Asset
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Asset Details Section */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Asset Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetItemId">Item Type</Label>
                  <Select onValueChange={(value) => setValue('assetItemId', value)}>
                    <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent className="glass border-slate-700">
                      <SelectItem value="1">Dell OptiPlex 7090</SelectItem>
                      <SelectItem value="2">HP LaserJet Pro M404n</SelectItem>
                      <SelectItem value="3">Samsung 27" Monitor</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    {...register('model')}
                    placeholder="e.g., OptiPlex 7090"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturingCompany">Manufacturing Company</Label>
                  <Input
                    id="manufacturingCompany"
                    {...register('manufacturingCompany')}
                    placeholder="e.g., Dell"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteId">Site</Label>
                  <Select onValueChange={(value) => setValue('siteId', value)}>
                    <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                      <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent className="glass border-slate-700">
                      <SelectItem value="site-a">Site A</SelectItem>
                      <SelectItem value="site-b">Site B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="statusId">Status</Label>
                  <Select onValueChange={(value) => setValue('statusId', value)}>
                    <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="glass border-slate-700">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="in-use">In Use</SelectItem>
                      <SelectItem value="under-repair">Under Repair</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...register('quantity', { valueAsNumber: true, min: 1 })}
                    placeholder="Quantity"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalInventoryCost">Total Inventory Cost ($)</Label>
                  <Input
                    id="totalInventoryCost"
                    type="number"
                    step="0.01"
                    {...register('totalInventoryCost', { valueAsNumber: true, min: 0 })}
                    placeholder="Enter cost"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* QR Code Section */}
<div className="md:col-span-3 lg:col-span-3">
  <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">
    QR Codes
  </h4>

  <div className="space-y-4">
    {/* Upload / Scan Button */}
    <div className="flex items-center space-x-3">
      <Button
        type="button"
        variant="outline"
        className="border-slate-700 hover:border-cyan-500"
        onClick={() => document.getElementById('qrUpload')?.click()}
      >
        Upload QR Code
      </Button>
      <input
        id="qrUpload"
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            const files = Array.from(e.target.files).map((file) =>
              URL.createObjectURL(file)
            );
            // You can store this in form state or local state
            setQrImages((prev) => [...prev, ...files]);
          }
        }}
      />
    </div>

    {/* Grid of Uploaded QR Codes */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {qrImages.length > 0 ? (
        qrImages.map((src, idx) => (
          <div
            key={idx}
            className="relative rounded-lg overflow-hidden border border-slate-700 glass group"
          >
            <img
              src={src}
              alt={`QR ${idx + 1}`}
              className="w-full h-32 object-contain bg-slate-900"
            />
            <button
              type="button"
              onClick={() =>
                setQrImages((prev) => prev.filter((_, i) => i !== idx))
              }
              className="absolute top-2 right-2 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))
      ) : (
        <p className="text-slate-400 text-sm">No QR codes uploaded.</p>
      )}
    </div>
  </div>
</div>


            {/* Location Details Section */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Location Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="locationCategoryId">Location Category</Label>
                  <Select onValueChange={(value) => setValue('locationCategoryId', value)}>
                    <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="glass border-slate-700">
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...register('location')}
                    placeholder="Building/Room"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subLocation">Sub-Location</Label>
                  <Input
                    id="subLocation"
                    {...register('subLocation')}
                    placeholder="Desk/Rack No."
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    {...register('level')}
                    placeholder="Floor/Level"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slot">Slot</Label>
                  <Input
                    id="slot"
                    {...register('slot')}
                    placeholder="Shelf/Cabinet"
                    className="glass border-slate-700 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Lifecycle & Other Details Section */}
<div className="md:col-span-3 lg:col-span-3">
  <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Lifecycle & Misc.</h4>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="space-y-2">
      <Label htmlFor="acquiredUnderId">Acquired Under</Label>
      <Select onValueChange={(value) => setValue('acquiredUnderId', value)}>
        <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
          <SelectValue placeholder="Select acquisition type" />
        </SelectTrigger>
        <SelectContent className="glass border-slate-700">
          <SelectItem value="purchase">Purchase</SelectItem>
          <SelectItem value="lease">Lease</SelectItem>
          <SelectItem value="donation">Donation</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="conversion">Conversion</Label>
      <Input
        id="conversion"
        {...register('conversion')}
        placeholder="e.g., converted from old model"
        className="glass border-slate-700 focus:border-cyan-500"
      />
    </div>

    {/* ✅ Added Date */}
    <div className="space-y-2">
      <Label htmlFor="addedDate">Added Date</Label>
      <Controller
        name="addedDate"
        control={control}
        rules={{ required: "Added date is required" }}
        render={({ field }) => (
          <DatePicker value={field.value} onChange={field.onChange} placeholder="Pick a date" />
        )}
      />
      {errors.addedDate && (
        <p className="text-red-400 text-sm">{errors.addedDate.message}</p>
      )}
    </div>

    {/* ✅ Expiry Date */}
    <div className="space-y-2">
      <Label htmlFor="expiryDate">Expiry Date</Label>
      <Controller
        name="expiryDate"
        control={control}
        render={({ field }) => (
          <DatePicker value={field.value} onChange={field.onChange} placeholder="Pick a date" />
        )}
      />
    </div>

    {/* ✅ Warranty Expiry */}
    <div className="space-y-2">
      <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
      <Controller
        name="warrantyExpiry"
        control={control}
        render={({ field }) => (
          <DatePicker value={field.value} onChange={field.onChange} placeholder="Pick a date" />
        )}
      />
    </div>

    {/* ✅ Calibration Due */}
    <div className="space-y-2">
      <Label htmlFor="calibrationDue">Calibration Due</Label>
      <Controller
        name="calibrationDue"
        control={control}
        render={({ field }) => (
          <DatePicker value={field.value} onChange={field.onChange} placeholder="Pick a date" />
        )}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="batchNo">Batch Number</Label>
      <Input
        id="batchNo"
        {...register('batchNo')}
        placeholder="Enter batch number"
        className="glass border-slate-700 focus:border-cyan-500"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="assigneeId">Assignee</Label>
      <Select onValueChange={(value) => setValue('assigneeId', value)}>
        <SelectTrigger className="glass border-slate-700 focus:border-cyan-500">
          <SelectValue placeholder="Select assignee" />
        </SelectTrigger>
        <SelectContent className="glass border-slate-700">
          <SelectItem value="1">John Smith</SelectItem>
          <SelectItem value="2">Sarah Wilson</SelectItem>
          <SelectItem value="3">Unassigned</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-2">
      <Label htmlFor="barcode">Barcode</Label>
      <Input
        id="barcode"
        {...register('barcode')}
        placeholder="Auto-generated or manual"
        className="glass border-slate-700 focus:border-cyan-500"
      />
    </div>
  </div>
</div>


            {/* Checkboxes & Notes Section */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-lg font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Flags & Notes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="blackListed" 
                    {...register('blackListed')} 
                    className="border-slate-600 data-[state=checked]:bg-red-500 data-[state=checked]:text-white" 
                  />
                  <Label htmlFor="blackListed">Blacklisted</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="markFlag" 
                    {...register('markFlag')} 
                    className="border-slate-600 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white" 
                  />
                  <Label htmlFor="markFlag">Mark Flag</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="markFavorite" 
                    {...register('markFavorite')} 
                    className="border-slate-600 data-[state=checked]:bg-purple-500 data-[state=checked]:text-white" 
                  />
                  <Label htmlFor="markFavorite">Mark Favorite</Label>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Add any relevant notes here..."
                  className="glass border-slate-700 focus:border-cyan-500 min-h-[100px]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-800">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
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