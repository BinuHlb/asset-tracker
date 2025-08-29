'use client';

import { motion } from 'framer-motion';
import { Settings, Database, Users, Shield, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">System Settings</h1>
        <p className="text-slate-400 text-lg">
          Configure your asset management system preferences and security
        </p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-cyan-400" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="text-slate-300">Auto Backup</Label>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-slate-300">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-alerts" className="text-slate-300">Maintenance Alerts</Label>
              <Switch id="maintenance-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor" className="text-slate-300">Two-Factor Authentication</Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-log" className="text-slate-300">Detailed Audit Logging</Label>
              <Switch id="audit-log" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-logout" className="text-slate-300">Auto Logout (30min)</Label>
              <Switch id="auto-logout" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <span>Database</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
              Backup Database
            </Button>
            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
              Export Data
            </Button>
            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
              Import Data
            </Button>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="glass border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
              Manage Roles
            </Button>
            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
              Permission Settings
            </Button>
            <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">
              User Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card className="glass border-slate-800">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">v2.1.0</p>
              <p className="text-sm text-slate-400">Application Version</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">99.9%</p>
              <p className="text-sm text-slate-400">System Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-violet-400">2,847</p>
              <p className="text-sm text-slate-400">Total Records</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}