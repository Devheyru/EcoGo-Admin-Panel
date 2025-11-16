"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, UserPlus, Star, Car, MapPin, MessageSquare, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licensePlate: string;
  rating: number;
  totalTrips: number;
  status: 'active' | 'offline' | 'on-trip';
  location: string;
}

const mockDrivers: Driver[] = [
  {
    id: 'D001',
    name: 'James Wilson',
    email: 'james.w@ecogo.ca',
    phone: '+1 416-555-0101',
    vehicleType: 'EV Sedan',
    licensePlate: 'ABC 123',
    rating: 4.8,
    totalTrips: 342,
    status: 'active',
    location: 'Downtown Toronto',
  },
  {
    id: 'D002',
    name: 'Maria Garcia',
    email: 'maria.g@ecogo.ca',
    phone: '+1 416-555-0102',
    vehicleType: 'EV SUV',
    licensePlate: 'XYZ 456',
    rating: 4.9,
    totalTrips: 428,
    status: 'on-trip',
    location: 'Mississauga',
  },
  {
    id: 'D003',
    name: 'Robert Chen',
    email: 'robert.c@ecogo.ca',
    phone: '+1 416-555-0103',
    vehicleType: 'EV Compact',
    licensePlate: 'DEF 789',
    rating: 4.7,
    totalTrips: 298,
    status: 'active',
    location: 'Scarborough',
  },
  {
    id: 'D004',
    name: 'Lisa Anderson',
    email: 'lisa.a@ecogo.ca',
    phone: '+1 416-555-0104',
    vehicleType: 'EV Van',
    licensePlate: 'GHI 012',
    rating: 4.6,
    totalTrips: 215,
    status: 'offline',
    location: 'North York',
  },
];

export function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [newDriverVehicleType, setNewDriverVehicleType] = useState('');

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Driver['status']) => {
    const colors = {
      active: { bg: '#D0F5DC', text: '#1B6635' },
      offline: { bg: '#E6E6E6', text: '#2D2D2D' },
      'on-trip': { bg: '#2DB85B', text: 'white' },
    };
    return colors[status];
  };

  const stats = [
    { label: 'Total Drivers', value: drivers.length },
    { label: 'Active Now', value: drivers.filter((d) => d.status === 'active').length },
    { label: 'On Trip', value: drivers.filter((d) => d.status === 'on-trip').length },
    { label: 'Offline', value: drivers.filter((d) => d.status === 'offline').length },
  ];

  const handleAddDriver = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDriver: Driver = {
      id: `D${String(drivers.length + 1).padStart(3, '0')}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      vehicleType: newDriverVehicleType,
      licensePlate: formData.get('licensePlate') as string,
      rating: 5.0,
      totalTrips: 0,
      status: 'offline',
      location: formData.get('location') as string,
    };
    setDrivers([...drivers, newDriver]);
    setIsAddDialogOpen(false);
    toast.success(`Driver ${newDriver.name} added successfully!`);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error('Please enter a message');
      return;
    }
    toast.success(`Message sent to ${selectedDriver?.name}`);
    setIsMessageDialogOpen(false);
    setMessageText('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: '#2F3A3F' }}>Drivers Dashboard</h1>
          <p style={{ color: '#2D2D2D' }}>Manage and monitor all drivers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#2DB85B', color: 'white' }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>Add a new driver to the EcoGo fleet</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDriver} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="john@ecogo.ca" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="+1 416-555-0000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type</Label>
                <Select value={newDriverVehicleType} onValueChange={setNewDriverVehicleType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EV Sedan">EV Sedan</SelectItem>
                    <SelectItem value="EV SUV">EV SUV</SelectItem>
                    <SelectItem value="EV Compact">EV Compact</SelectItem>
                    <SelectItem value="EV Van">EV Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input id="licensePlate" name="licensePlate" placeholder="ABC 123" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Base Location</Label>
                <Input id="location" name="location" placeholder="Downtown Toronto" required />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" style={{ backgroundColor: '#2DB85B', color: 'white' }}>
                  Add Driver
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <h3 style={{ color: '#2DB85B' }}>{stat.value}</h3>
              <p style={{ color: '#2D2D2D' }}>{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#2D2D2D' }} />
            <Input
              placeholder="Search drivers by name, email, or license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDrivers.map((driver) => {
          const statusColor = getStatusColor(driver.status);
          return (
            <Card key={driver.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {driver.name}
                      <Badge style={{ backgroundColor: statusColor.bg, color: statusColor.text }}>
                        {driver.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm mt-1" style={{ color: '#2D2D2D' }}>{driver.email}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{driver.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm" style={{ color: '#2D2D2D' }}>Phone</p>
                    <p className="text-sm">{driver.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#2D2D2D' }}>Total Trips</p>
                    <p className="text-sm">{driver.totalTrips}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#D0F5DC' }}>
                  <Car className="w-4 h-4" style={{ color: '#2DB85B' }} />
                  <div className="flex-1">
                    <p className="text-sm">{driver.vehicleType}</p>
                    <p className="text-sm" style={{ color: '#2D2D2D' }}>{driver.licensePlate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: '#2DB85B' }} />
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>{driver.location}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => { setSelectedDriver(driver); setIsViewDialogOpen(true); }}>
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" style={{ backgroundColor: '#2DB85B', color: 'white' }} className="flex-1" onClick={() => { setSelectedDriver(driver); setIsMessageDialogOpen(true); }}>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Driver Profile</DialogTitle>
            <DialogDescription>View complete driver information</DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3>{selectedDriver.name}</h3>
                  <p className="text-sm mt-1" style={{ color: '#2D2D2D' }}>{selectedDriver.email}</p>
                </div>
                <Badge style={{ backgroundColor: getStatusColor(selectedDriver.status).bg, color: getStatusColor(selectedDriver.status).text }}>
                  {selectedDriver.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#D0F5DC' }}>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <div>
                  <p>{selectedDriver.rating} Rating</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Phone Number</p>
                  <p>{selectedDriver.phone}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Vehicle Information</p>
                  <p>{selectedDriver.vehicleType} - {selectedDriver.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#2D2D2D' }}>Base Location</p>
                  <p>{selectedDriver.location}</p>
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
            <DialogDescription>Send a message to {selectedDriver?.name}</DialogDescription>
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

