"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { LoginPage } from "@/components/LoginPage";
import { Sidebar } from "@/components/Sidebar";
import { DashboardPage } from "@/components/DashboardPage";
import { UsersPage } from "@/components/UsersPage";
import { DriversPage } from "@/components/DriversPage";
import { RidersPage } from "@/components/RidersPage";
import { AdminsPage } from "@/components/AdminsPage";
import { OperatorsPage } from "@/components/OperatorsPage";
import { BookingsPage } from "@/components/BookingsPage";
import { ReportsPage } from "@/components/ReportsPage";
import { SettingsPage } from "@/components/SettingsPage";
import { UserRole } from "@/types";

export function AppShell() {
  const router = useRouter();
  const pathname = usePathname();

  // Avoid hydration mismatches by rendering only after mount
  const [mounted, setMounted] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const [userName, setUserName] = useState("");

  // Mark mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load persisted auth + sync path -> currentPage
  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem("ecogo.loggedIn");
      const role = localStorage.getItem("ecogo.userRole") as UserRole | null;
      const name = localStorage.getItem("ecogo.userName");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
        if (role) setUserRole(role);
        if (name) setUserName(name);
      }
    } catch {}

    if (pathname) {
      const page = pathname.replace(/^\//, "") || "dashboard";
      setCurrentPage(page);
    }
  }, [pathname]);

  const handleLogin = (email: string, _password: string, role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    const computedName = email.split("@")[0].replace(".", " ");
    setUserName(computedName);

    try {
      localStorage.setItem("ecogo.loggedIn", "true");
      localStorage.setItem("ecogo.userRole", role);
      localStorage.setItem("ecogo.userName", computedName);
    } catch {}

    router.push("/dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    setUserName("");
    try {
      localStorage.removeItem("ecogo.loggedIn");
      localStorage.removeItem("ecogo.userRole");
      localStorage.removeItem("ecogo.userName");
    } catch {}
    router.push("/");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);
  };

  if (!mounted) {
    return null;
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {currentPage === "dashboard" && <DashboardPage />}
        {currentPage === "users" && userRole === "admin" && <UsersPage />}
        {currentPage === "drivers" && userRole === "admin" && <DriversPage />}
        {currentPage === "riders" && userRole === "admin" && <RidersPage />}
        {currentPage === "admins" && userRole === "admin" && <AdminsPage />}
        {currentPage === "operators" && userRole === "admin" && (
          <OperatorsPage />
        )}
        {currentPage === "bookings" && <BookingsPage />}
        {currentPage === "reports" && <ReportsPage userRole={userRole} />}
        {currentPage === "settings" && userRole === "admin" && <SettingsPage />}
      </main>
    </div>
  );
}

export default AppShell;
