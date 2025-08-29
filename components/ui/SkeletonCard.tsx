'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export function SkeletonCard() {
  return (
    <Card className="glass border-slate-800">
      <CardContent className="p-6">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-800 rounded w-3/4" />
              <div className="h-3 bg-slate-800 rounded w-1/2" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-3 bg-slate-800 rounded w-full" />
            <div className="h-3 bg-slate-800 rounded w-4/5" />
            <div className="h-3 bg-slate-800 rounded w-3/5" />
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <div className="h-4 bg-slate-800 rounded w-20" />
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-slate-800 rounded" />
              <div className="w-8 h-8 bg-slate-800 rounded" />
              <div className="w-8 h-8 bg-slate-800 rounded" />
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}