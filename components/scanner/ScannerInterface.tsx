'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Camera, Search, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export function ScannerInterface() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedAssets, setScannedAssets] = useState<any[]>([]);
  const [manualCode, setManualCode] = useState('');

  const simulateScanning = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const mockAsset = {
        id: Date.now(),
        assetTag: 'AST-001234',
        name: 'Dell OptiPlex 7090',
        serialNumber: 'DL7090X456789',
        location: 'IT Department - Floor 2',
        status: 'Active',
        assignee: 'John Smith',
        lastScanned: new Date().toISOString()
      };
      
      setScannedAssets(prev => [mockAsset, ...prev]);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualScan = () => {
    if (manualCode.trim()) {
      const mockAsset = {
        id: Date.now(),
        assetTag: manualCode.toUpperCase(),
        name: 'Samsung 27" Monitor',
        serialNumber: 'SM27UHD456',
        location: 'Marketing Department',
        status: 'Active',
        assignee: 'Sarah Wilson',
        lastScanned: new Date().toISOString()
      };
      
      setScannedAssets(prev => [mockAsset, ...prev]);
      setManualCode('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">Asset Scanner</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Scan QR codes or barcodes to quickly identify, verify, and count assets
        </p>
      </div>

      {/* Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-cyan-400" />
              <span>Camera Scanner</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <motion.div 
                className="aspect-square bg-slate-900 rounded-lg border-2 border-dashed border-slate-700 flex items-center justify-center"
                animate={{ 
                  borderColor: isScanning ? '#06B6D4' : '#334155',
                }}
                transition={{ repeat: isScanning ? Infinity : 0, duration: 1 }}
              >
                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center space-y-4"
                    >
                      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-cyan-400 font-medium">Scanning...</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center space-y-4"
                    >
                      <QrCode className="w-16 h-16 text-slate-600 mx-auto" />
                      <p className="text-slate-400">Position QR code in camera view</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                </motion.div>
              </div>
            
            <Button 
              onClick={simulateScanning}
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              {isScanning ? 'Scanning...' : 'Start Camera Scan'}
            </Button>
          </CardContent>
        </Card>

        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-cyan-400" />
              <span>Manual Entry</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manualCode">Asset Tag or Barcode</Label>
                <Input
                  id="manualCode"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter asset tag or scan code"
                  className="glass border-slate-700 focus:border-cyan-500"
                />
              </div>
              
              <Button 
                onClick={handleManualScan}
                disabled={!manualCode.trim()}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
              >
                Lookup Asset
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <div className="text-center space-y-2">
                <Package className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">
                  Enter asset information manually or use camera to scan QR codes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanned Assets */}
      {scannedAssets.length > 0 && (
        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Recently Scanned Assets</span>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {scannedAssets.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scannedAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-200">{asset.name}</span>
                        <Badge variant="outline" className="text-xs">{asset.assetTag}</Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        {asset.location} • {asset.assignee}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {asset.status}
                    </Badge>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(asset.lastScanned).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}