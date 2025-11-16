"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, Shield, Edit, Trash2 } from 'lucide-react';
import { User } from '@/types';
import { toast } from 'sonner';

const mockAdmins: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john.admin@ecogo.ca',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2025-11-14T09:30:00',
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily.chen@ecogo.ca',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-20',
    lastLogin: '2025-11-14T07:20:00',
  },
  {
    id: '6',
    name: 'Michael Brown',
    email: 'michael.b@ecogo.ca',
    role: 'admin',
    status: 'active',
    createdAt: '2024-02-10',
    lastLogin: '2025-11-13T18:45:00',
  },
  {
    id: '7',
    name: 'Sarah Johnson',
    email: 'sarah.j@ecogo.ca',
    role: 'admin',
    status: 'inactive',
    createdAt: '2024-03-05',
    lastLogin: '2025-10-15T14:20:00',
  },
];

export function AdminsPage() {
  const [admins, setAdmins] = useState<User[]>(mockAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAdmin: User = {
      id: `${admins.length + 1}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAdmins([...admins, newAdmin]);
    setIsAddDialogOpen(false);
    toast.success('Admin added successfully!');
  };

  const handleDeleteAdmin = (id: string) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
    toast.success('Admin deleted successfully!');
  };

  const stats = [
    { label: 'Total Admins', value: admins.length },
    { label: 'Active', value: admins.filter((a) => a.status === 'active').length },
    { label: 'Inactive', value: admins.filter((a) => a.status === 'inactive').length },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ color: '#2F3A3F' }}>Admin Dashboard</h1>
          <p style={{ color: '#2D2D2D' }}>Manage system administrators and permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: '#2DB85B', color: 'white' }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Administrator</DialogTitle>
              <DialogDescription>
                Create a new admin account with full system access
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Corporate Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@ecogo.ca" required />
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                <p className="text-sm" style={{ color: '#92400E' }}>
                  <strong>Important:</strong> This user will have full administrative access including user management, system settings, and audit logs.
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" style={{ backgroundColor: '#2DB85B', color: 'white' }}>
                  Create Admin
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D0F5DC' }}>
                  <Shield className="w-5 h-5" style={{ color: '#2DB85B' }} />
                </div>
                <h3 style={{ color: '#2DB85B' }}>{stat.value}</h3>
              </div>
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
              placeholder="Search admins by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card style={{ backgroundColor: '#FEF3C7', borderColor: '#92400E' }}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 mt-1" style={{ color: '#92400E' }} />
            <div>
              <h4 style={{ color: '#92400E' }}>Administrator Access</h4>
              <p style={{ color: '#92400E' }}>
                Administrators have full system access. Only grant admin privileges to trusted personnel. All admin actions are logged in the audit trail.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottomWidth: '1px', borderColor: '#E6E6E6' }}>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Created</th>
                  <th className="text-left p-4">Last Login</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} style={{ borderBottomWidth: '1px', borderColor: '#E6E6E6' }}>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" style={{ color: '#2DB85B' }} />
                        <span>{admin.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">
                      <Badge
                        style={
                          admin.status === 'active'
                            ? { backgroundColor: '#D0F5DC', color: '#1B6635' }
                            : { backgroundColor: '#E6E6E6', color: '#2D2D2D' }
                        }
                      >
                        {admin.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm" style={{ color: '#2D2D2D' }}>
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm" style={{ color: '#2D2D2D' }}>
                      {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteAdmin(admin.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

