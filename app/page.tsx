"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Inventory from "@/components/Inventory";
import Vendors from "@/components/Vendors";
import Orders from "@/components/Orders";
import Products from "@/components/Products";
import Reports from "@/components/Reports";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <Inventory />;
      case "products":
        return <Products />;
      case "vendors":
        return <Vendors />;
      case "orders":
        return <Orders />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
