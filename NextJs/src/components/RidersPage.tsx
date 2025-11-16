"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, UserPlus, TrendingUp, Calendar, DollarSign, Eye, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalTrips: number;
  totalSpent: number;
  memberSince: string;
  lastTrip: string;
  status: 'active' | 'inactive' | 'suspended';
}

const mockRiders: Rider[] = [
  {
    id: 'R001',
    name: 'Alice Cooper',
    email: 'alice.c@email.com',
    phone: '+1 416-555-1001',
    totalTrips: 45,
    totalSpent: 1245.50,
    memberSince: '2024-01-15',
    lastTrip: '2025-11-14',
    status: 'active',
  },
  {
    id: 'R002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    phone: '+1 416-555-1002',
    totalTrips: 78,
    totalSpent: 2156.75,
    memberSince: '2023-11-20',
    lastTrip: '2025-11-13',
    status: 'active',
  },
  {
    id: 'R003',
    name: 'Carol White',
    email: 'carol.w@email.com',
    phone: '+1 416-555-1003',
    totalTrips: 23,
    totalSpent: 645.20,
    memberSince: '2024-05-10',
    lastTrip: '2025-11-10',
    status: 'active',
  },
  {
    id: 'R004',
    name: 'Daniel Lee',
    email: 'daniel.l@email.com',
    phone: '+1 416-555-1004',
    totalTrips: 12,
    totalSpent: 356.00,
    memberSince: '2024-08-22',
    lastTrip: '2025-10-28',
    status: 'inactive',
  },
  {
    id: 'R005',
    name: 'Emma Wilson',
    email: 'emma.w@email.com',
    phone: '+1 416-555-1005',
    totalTrips: 156,
    totalSpent: 4523.90,
    memberSince: '2023-06-15',
    lastTrip: '2025-11-14',
    status: 'active',
  },
];

export function RidersPage() {
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  const filteredRiders = riders.filter(
    (rider) =>
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Rider['status']) => {
    const colors = {
      active: { bg: '#D0F5DC', text: '#1B6635' },
      inactive: { bg: '#E6E6E6', text: '#2D2D2D' },
      suspended: { bg: '#FEE2E2', text: '#991B1B' },
    };
    return colors[status];
  };

  const totalRevenue = riders.reduce((sum, rider) => sum + rider.totalSpent, 0);
  const totalTrips = riders.reduce((sum, rider) => sum + rider.totalTrips, 0);

  const stats = [
    { label: 'Total Riders', value: riders.length, icon: UserPlus },
    { label: 'Active Riders', value: riders.filter((r) => r.status === 'active').length, icon: TrendingUp },
    { label: 'Total Trips', value: totalTrips, icon: Calendar },
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
  ];

  const handleAddRider = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRider: Rider = {
      id: `R${String(riders.length + 1).padStart(3, '0')}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      totalTrips: 0,
      totalSpent: 0,
      memberSince: new Date().toISOString().split('T')[0],
      lastTrip: '',
      status: 'active',
    };
    setRiders([...riders, newRider]);
    setIsAddDialogOpen(false);
    toast.success(`Rider ${newRider.name} added successfully!`);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success(`Message sent to ${selectedRider?.name}`);
    setIsMessageDialogOpen(false);
    setMessageText('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: '#2F3A3F' }}>Riders Dashboard</h1>
          <p style={{ color: '#2D2D2D' }}>Manage and monitor all riders</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#2DB85B', color: 'white' }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Rider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Rider</DialogTitle>
              <DialogDescription>Register a new rider in the system</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddRider} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="+1 416-555-0000" required />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" style={{ backgroundColor: '#2DB85B', color: 'white' }}>
                  Add Rider
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D0F5DC' }}>
                    <Icon className="w-5 h-5" style={{ color: '#2DB85B' }} />
                  </div>
                  <h3 style={{ color: '#2DB85B' }}>{stat.value}</h3>
                </div>
                <p style={{ color: '#2D2D2D' }}>{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#2D2D2D' }} />
            <Input
              placeholder="Search riders by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Riders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottomWidth: '1px', borderColor: '#E6E6E6' }}>
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Total Trips</th>
                  <th className="text-left p-4">Total Spent</th>
                  <th className="text-left p-4">Member Since</th>
                  <th className="text-left p-4">Last Trip</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRiders.map((rider) => {
                  const statusColor = getStatusColor(rider.status);
                  return (
                    <tr key={rider.id} style={{ borderBottomWidth: '1px', borderColor: '#E6E6E6' }}>
                      <td className="p-4">{rider.id}</td>
                      <td className="p-4">
                        <p>{rider.name}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{rider.email}</p>
                        <p className="text-sm" style={{ color: '#2D2D2D' }}>{rider.phone}</p>
                      </td>
                      <td className="p-4">
                        <Badge style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
                          {rider.status}
                        </Badge>
                      </td>
                      <td className="p-4">{rider.totalTrips}</td>
                      <td className="p-4" style={{ color: '#2DB85B' }}>
                        ${rider.totalSpent.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#2D2D2D' }}>
                        {new Date(rider.memberSince).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm" style={{ color: '#2D2D2D' }}>
                        {rider.lastTrip ? new Date(rider.lastTrip).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setSelectedRider(rider); setIsViewDialogOpen(true); }}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" style={{ backgroundColor: '#2DB85B', color: 'white' }} onClick={() => { setSelectedRider(rider); setIsMessageDialogOpen(true); }}>
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rider Profile</DialogTitle>
            <DialogDescription>View complete rider information</DialogDescription>
          </DialogHeader>
          {selectedRider && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3>{selectedRider.name}</h3>
                  <p className="text-sm mt-1" style={{ color: '#2D2D2D' }}>{selectedRider.email}</p>
                </div>
                <Badge style={{ backgroundColor: getStatusColor(selectedRider.status).bg, color: getStatusColor(selectedRider.status).text }}>
                  {selectedRider.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#D0F5DC' }}>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Total Trips</p>
                  <h4 style={{ color: '#2DB85B' }}>{selectedRider.totalTrips}</h4>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#D0F5DC' }}>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Total Spent</p>
                  <h4 style={{ color: '#2DB85B' }}>${selectedRider.totalSpent.toFixed(2)}</h4>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Phone Number</p>
                  <p>{selectedRider.phone}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Member Since</p>
                  <p>{new Date(selectedRider.memberSince).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Last Trip</p>
                  <p>{selectedRider.lastTrip ? new Date(selectedRider.lastTrip).toLocaleDateString() : 'No trips yet'}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>Send a message to {selectedRider?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={5}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: '#2DB85B', color: 'white' }} onClick={handleSendMessage}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

