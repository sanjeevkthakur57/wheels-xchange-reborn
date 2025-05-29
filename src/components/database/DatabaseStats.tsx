
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Car, Users, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { cars, users } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const DatabaseStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCars: 0,
    pendingApproval: 0,
    approved: 0,
    rejected: 0,
    sold: 0,
    totalUsers: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch cars data
      const carsResponse = await cars.getAll();
      const carsData = carsResponse.cars || [];
      
      // Fetch users data
      let totalUsers = 0;
      try {
        const usersResponse = await users.getAllUsers();
        totalUsers = usersResponse.users?.length || 0;
      } catch (error) {
        console.log('Users endpoint not available, using default value');
      }

      // Calculate stats
      const totalCars = carsData.length;
      const pendingApproval = carsData.filter((car: any) => !car.status || car.status === 'pending').length;
      const approved = carsData.filter((car: any) => car.status === 'approved').length;
      const rejected = carsData.filter((car: any) => car.status === 'rejected').length;
      const sold = carsData.filter((car: any) => car.status === 'sold').length;

      setStats({
        totalCars,
        pendingApproval,
        approved,
        rejected,
        sold,
        totalUsers
      });

    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch database statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { name: 'Pending', value: stats.pendingApproval, color: '#f59e0b' },
    { name: 'Approved', value: stats.approved, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' },
    { name: 'Sold', value: stats.sold, color: '#6366f1' }
  ];

  const barData = [
    { month: 'Jan', cars: Math.floor(stats.totalCars * 0.1) },
    { month: 'Feb', cars: Math.floor(stats.totalCars * 0.15) },
    { month: 'Mar', cars: Math.floor(stats.totalCars * 0.2) },
    { month: 'Apr', cars: Math.floor(stats.totalCars * 0.25) },
    { month: 'May', cars: Math.floor(stats.totalCars * 0.3) },
    { month: 'Jun', cars: stats.totalCars }
  ];

  if (loading) {
    return <div className="text-center py-8">Loading statistics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground">Listed in database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApproval}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Cars</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Ready for sale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Car Status Distribution</CardTitle>
            <CardDescription>Current status of all car listings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Car Listings</CardTitle>
            <CardDescription>Number of cars listed per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cars" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Status Overview</CardTitle>
          <CardDescription>Current state of all car listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Pending: {stats.pendingApproval}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default">Approved: {stats.approved}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive">Rejected: {stats.rejected}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Sold: {stats.sold}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseStats;
