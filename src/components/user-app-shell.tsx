"use client";

import { useState, useEffect } from "react";
import { AuthSection } from "@/components/auth-section";
import { UserDashboard } from "@/components/user-dashboard";
import { NoticeBar } from "@/components/notice-bar";
import { BottomNav } from "@/components/bottom-nav";
import { WalletSection } from "@/components/wallet-section";
import { HistorySection } from "@/components/history-section";
import { ProfileSection } from "@/components/profile-section";

export function UserAppShell() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [userData, setUserData] = useState({
    name: "Player One",
    email: "player@example.com",
    balance: 0,
    phoneNumber: ""
  });

  // Load state or simulate persistence
  useEffect(() => {
    const saved = localStorage.getItem("zresports_auth");
    if (saved) setIsAuthenticated(true);
    
    // Default mock data for dashboard
    const storedUser = localStorage.getItem("zresports_user");
    if (storedUser) setUserData(JSON.parse(storedUser));
  }, []);

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setUserData(user);
    localStorage.setItem("zresports_auth", "true");
    localStorage.setItem("zresports_user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("zresports_auth");
    setActiveTab("home");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <AuthSection onAuthSuccess={handleLogin} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto relative pb-20 overflow-x-hidden">
      <NoticeBar />
      
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === "home" && <UserDashboard userData={userData} />}
        {activeTab === "wallet" && <WalletSection userData={userData} setUserData={setUserData} />}
        {activeTab === "history" && <HistorySection />}
        {activeTab === "profile" && <ProfileSection userData={userData} onLogout={handleLogout} />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
