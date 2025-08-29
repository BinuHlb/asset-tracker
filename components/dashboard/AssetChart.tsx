'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { month: 'Jan', active: 240, maintenance: 12, disposed: 8 },
  { month: 'Feb', active: 267, maintenance: 15, disposed: 5 },
  { month: 'Mar', active: 289, maintenance: 18, disposed: 12 },
  { month: 'Apr', active: 312, maintenance: 22, disposed: 7 },
  { month: 'May', active: 335, maintenance: 19, disposed: 9 },
  { month: 'Jun', active: 358, maintenance: 16, disposed: 14 },
];

export function AssetChart() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-200">
            Asset Status Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }}
                />
                <Bar dataKey="active" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="maintenance" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="disposed" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}