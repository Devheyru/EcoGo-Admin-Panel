"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { UserRole } from "@/types";
import Image from "next/image";
import logo from "../assets/ecogo-logo.png";

interface LoginPageProps {
  onLogin: (email: string, password: string, role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: "var(--charcoal-dark)" }}
    >
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="EcoGo Logo"
              width={96}
              height={96}
              className="rounded-[30px]"
            />
          </div>
          <div>
            <h1 className="text-white">EcoGo Admin Portal</h1>
              <p style={{ color: "var(--gray-light)" }}>Drive Clean. Go Green.</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to manage users, dispatches and system settings. Use your
              corporate credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Select Role</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={role === "admin" ? "default" : "outline"}
                    className="flex-1"
                      style={
                        role === "admin"
                          ? { backgroundColor: "var(--eco-green)", color: "white" }
                          : {}
                      }
                    onClick={() => setRole("admin")}
                  >
                    Admin
                  </Button>
                  <Button
                    type="button"
                    variant={role === "operator" ? "default" : "outline"}
                    className="flex-1"
                      style={
                        role === "operator"
                          ? { backgroundColor: "var(--eco-green)", color: "white" }
                          : {}
                      }
                    onClick={() => setRole("operator")}
                  >
                    Operator
                  </Button>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Corporate Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@ecogo.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm hover:underline"
                    style={{ color: "var(--eco-green)" }}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                  style={{ backgroundColor: "var(--eco-green)", color: "white" }}
              >
                Sign In
              </Button>
            </form>

            {/* Login Tips Toggle */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--eco-green)" }}
              >
                <AlertCircle className="w-4 h-4" />
                {showTips ? "Hide" : "Show"} Login Tips
              </button>

              {showTips && (
                <div
                  className="mt-3 p-4 rounded-lg"
                  style={{ backgroundColor: "var(--gray-light)" }}
                >
                  <ul
                    className="space-y-2 text-sm"
                    style={{ color: "var(--charcoal-dark)" }}
                  >
                    <li>• Use your corporate email and password</li>
                    <li>• Choose your role (Admin or Operator) before signing in</li>
                    <li>• Use the "Forgot?" link to reset your password</li>
                    <li>• Contact IT at support@ecogo.ca if you cannot sign in</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Role Info */}
            <div
              className="mt-6 p-4 rounded-lg border"
              style={{ borderColor: "var(--gray-mid)" }}
            >
              <h4 className="mb-2" style={{ color: "var(--eco-green)" }}>
                {role === "admin" ? "Admin Access" : "Operator Access"}
              </h4>
              <ul className="space-y-1 text-sm" style={{ color: "var(--charcoal-dark)" }}>
                {role === "admin" ? (
                  <>
                    <li>• Manage users & roles</li>
                    <li>• Change system-wide settings</li>
                    <li>• View & export audit logs</li>
                    <li>• Approve financial operations</li>
                    <li>• Configure promotions & integrations</li>
                  </>
                ) : (
                  <>
                    <li>• Manage bookings & dispatch</li>
                    <li>• Issue refunds (within guidelines)</li>
                    <li>• View limited logs and reports</li>
                    <li>• No billing or system settings access</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center mt-6 text-sm" style={{ color: "#2D2D2D" }}>
          © 2025 EcoGo Canada. All rights reserved.
        </p>
      </div>
    </div>
  );
}
