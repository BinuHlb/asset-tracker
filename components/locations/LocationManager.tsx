'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Building, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockLocations = [
  {
    id: '1',
    name: 'Main Office Building',
    type: 'Building',
    address: '123 Business District, City Center',
    floors: 5,
    assetCount: 234,
    children: [
      { name: 'Floor 1 - Reception', assetCount: 15 },
      { name: 'Floor 2 - IT Department', assetCount: 89 },
      { name: 'Floor 3 - Marketing', assetCount: 67 },
      { name: 'Floor 4 - Finance', assetCount: 45 },
      { name: 'Floor 5 - Executive', assetCount: 18 }
    ]
  },
  {
    id: '2',
    name: 'Warehouse A',
    type: 'Warehouse',
    address: '456 Industrial Park, Zone B',
    floors: 1,
    assetCount: 156,
    children: [
      { name: 'Section A1 - Electronics', assetCount: 78 },
      { name: 'Section A2 - Furniture', assetCount: 45 },
      { name: 'Section A3 - Equipment', assetCount: 33 }
    ]
  },
  {
    id: '3',
    name: 'Remote Office',
    type: 'Branch',
    address: '789 Suburban Plaza, District 3',
    floors: 2,
    assetCount: 67,
    children: [
      { name: 'Ground Floor - Operations', assetCount: 34 },
      { name: 'Upper Floor - Management', assetCount: 33 }
    ]
  }
];

export function LocationManager() {
  const [expandedLocation, setExpandedLocation] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">Location Management</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Organize and map your physical locations, buildings, and asset placement
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Location
        </Button>
        <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
          <Navigation className="w-4 h-4 mr-2" />
          Map View
        </Button>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockLocations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="glass border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-200">{location.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {location.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-cyan-400">{location.assetCount}</p>
                    <p className="text-xs text-slate-500">Assets</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <p className="text-sm text-slate-300">{location.address}</p>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => setExpandedLocation(
                      expandedLocation === location.id ? null : location.id
                    )}
                    className="w-full justify-start text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                  >
                    {expandedLocation === location.id ? 'Hide' : 'Show'} Sub-locations ({location.children.length})
                  </Button>

                  <div>
                    {expandedLocation === location.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 pl-4 border-l border-slate-700"
                      >
                        {location.children.map((child, childIndex) => (
                          <motion.div
                            key={childIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: childIndex * 0.05 }}
                            className="flex items-center justify-between p-2 rounded bg-slate-900/30"
                          >
                            <span className="text-sm text-slate-300">{child.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {child.assetCount}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-center">
                  <div>
                    <p className="text-sm text-slate-400">Floors</p>
                    <p className="text-lg font-semibold text-slate-200">{location.floors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Capacity</p>
                    <p className="text-lg font-semibold text-emerald-400">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}