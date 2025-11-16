"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  FileText,
  LogOut,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { UserRole } from "@/types";
import Image from "next/image";
import logo from "../assets/ecogo-logo.png";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

export function Sidebar({
  currentPage,
  onNavigate,
  userRole,
  userName,
  onLogout,
}: SidebarProps) {
  const [isUserMenuExpanded, setIsUserMenuExpanded] = useState(false);

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "reports", label: "Audit Logs", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const operatorMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : operatorMenuItems;

  const userManagementItems = [
    { id: "drivers", label: "Drivers", count: 156 },
    { id: "riders", label: "Riders", count: 892 },
    { id: "admins", label: "Admins", count: 4 },
    { id: "operators", label: "Operators", count: 12 },
  ];

  return (
    <aside
      className="w-64 flex flex-col"
      style={{ backgroundColor: "var(--charcoal-dark)" }}
    >
      {/* Logo Section */}
      <div className="p-6 border-b" style={{ borderColor: "var(--gray-mid)" }}>
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="EcoGo Logo"
            width={96}
            height={96}
            className="rounded-[30px]"
          />
          <div>
            <h3 className="text-white">EcoGo</h3>
            <p className="text-xs" style={{ color: "#D0F5DC" }}>
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div
        className="px-6 py-4 mb-4"
        style={{ backgroundColor: "var(--eco-green)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4" style={{ color: "var(--white)" }} />
          <span
            className="text-xs uppercase tracking-wide"
            style={{ color: "var(--white)" }}
          >
            {userRole}
          </span>
        </div>
        <p className="text-white truncate">{userName}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          // Special handling for Users menu item
          if (item.id === "users") {
            return (
              <div key={item.id}>
                <button
                  onClick={() => setIsUserMenuExpanded(!isUserMenuExpanded)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors"
                  style={{
                    backgroundColor:
                      isActive || isUserMenuExpanded
                        ? "var(--eco-green)"
                        : "transparent",
                    color: "white",
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {isUserMenuExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isUserMenuExpanded && (
                  <div className="ml-4 mb-2 space-y-1">
                    {userManagementItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => onNavigate(subItem.id)}
                        className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm"
                        style={{
                          backgroundColor:
                            currentPage === subItem.id
                              ? "var(--eco-green)"
                              : "transparent",
                          color: "white",
                        }}
                      >
                        <span>{subItem.label}</span>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{
                            backgroundColor: "var(--gray-light)",
                            color: "var(--charcoal-dark)",
                          }}
                        >
                          {subItem.count}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors"
              style={{
                backgroundColor: isActive ? "var(--eco-green)" : "transparent",
                color: "white",
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          style={{ color: "white", backgroundColor: "transparent" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--error-red)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div
        className="p-4 text-center text-xs"
        style={{ color: "var(--gray-light)" }}
      >
        © 2025 EcoGo Canada
      </div>
    </aside>
  );
}
