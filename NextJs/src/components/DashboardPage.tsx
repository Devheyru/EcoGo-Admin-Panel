"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Car, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockAnalytics } from "@/lib/mockData";

export function DashboardPage() {
  const stats = [
    {
      label: "Total Trips",
      value: "4,562",
      change: "+12.5%",
      color: "var(--eco-green)",
      icon: TrendingUp,
    },
    {
      label: "Active Drivers",
      value: "156",
      change: "+5.2%",
      color: "var(--charcoal-dark)",
      icon: Car,
    },
    {
      label: "Total Revenue",
      value: "$124,842",
      change: "+15.2%",
      color: "var(--eco-green)",
      icon: DollarSign,
    },
    {
      label: "Active Riders",
      value: "892",
      change: "+8.3%",
      color: "var(--charcoal-dark)",
      icon: Users,
    },
  ];

  const COLORS = [
    "var(--eco-green)",
    "var(--charcoal-dark)",
    "var(--gray-light)",
    "var(--charcoal-text)",
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 style={{ color: "var(--charcoal-dark)" }}>Dashboard</h1>
        <p style={{ color: "var(--charcoal-dark)" }}>
          Overview of your EcoGo operations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span
                    className="text-sm px-2 py-1 rounded"
                    style={{
                      backgroundColor: "var(--gray-light)",
                      color: "var(--charcoal-dark)",
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3>{stat.value}</h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--charcoal-dark)" }}
                >
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings Trend (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockAnalytics.bookingsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-mid)" />
                <XAxis dataKey="date" stroke="var(--charcoal-dark)" />
                <YAxis stroke="var(--charcoal-dark)" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--eco-green)"
                  strokeWidth={3}
                  name="Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-mid)" />
                <XAxis dataKey="date" stroke="var(--charcoal-dark)" />
                <YAxis stroke="var(--charcoal-dark)" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="var(--eco-green)"
                  name="Revenue ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.topRoutes.map((route, index) => {
                const maxCount = mockAnalytics.topRoutes[0].count;
                const percentage = (route.count / maxCount) * 100;
                return (
                  <div key={route.route}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-sm"
                        style={{ color: "var(--charcoal-dark)" }}
                      >
                        {route.route}
                      </span>
                      <span style={{ color: "var(--eco-green)" }}>
                        {route.count}
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full"
                      style={{ backgroundColor: "var(--gray-mid)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: "var(--eco-green)",
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockAnalytics.vehicleUtilization}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {mockAnalytics.vehicleUtilization.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
