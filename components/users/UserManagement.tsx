'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search, Filter, User, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { CreateUserDialog } from './CreateUserDialog';


const mockUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'IT Manager',
    department: 'Information Technology',
    phone: '+1 (555) 123-4567',
    location: 'Floor 2 - IT Department',
    assignedAssets: 5,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Marketing Director',
    department: 'Marketing',
    phone: '+1 (555) 234-5678',
    location: 'Floor 3 - Marketing',
    assignedAssets: 3,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Network Administrator',
    department: 'Information Technology',
    phone: '+1 (555) 345-6789',
    location: 'Floor 2 - Server Room',
    assignedAssets: 8,
    status: 'Active'
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    role: 'Finance Analyst',
    department: 'Finance',
    phone: '+1 (555) 456-7890',
    location: 'Floor 4 - Finance',
    assignedAssets: 2,
    status: 'On Leave'
  }
];

export function UserManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users] = useState(mockUsers);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      : 'bg-amber-500/20 text-amber-400 border-amber-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">User Management</h1>
          <p className="text-slate-400 mt-2">
            Manage users, roles, and asset assignments across your organization
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          
          <Input
          id="user-search"
  name="user-search"
            placeholder="Search users by name, email, oru department..."
            className="pl-10 glass border-slate-700 focus:border-cyan-500"
          />
          <Search className="absolute left-3 z-1 56H30 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        <Button variant="outline" >
          <Filter className="w-4 h-4 mr-2" />
          Filteree
        </Button>
      </div>

      {/* Users List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500">
                        <AvatarFallback className="text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-200">{user.name}</h3>
                        <p className="text-sm text-slate-400">{user.role}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{user.department}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{user.location}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-cyan-400">{user.assignedAssets}</p>
                      <p className="text-xs text-slate-400">Assigned Assets</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-700 hover:bg-slate-800">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    <CreateUserDialog 
            open={showCreateDialog} 
            onOpenChange={setShowCreateDialog} 
          />
    </div>
  );
}