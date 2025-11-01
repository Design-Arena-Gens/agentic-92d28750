"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Store
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "products", label: "Products", icon: Store },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary">Store ERP</h1>
        <p className="text-sm text-gray-500 mt-1">Management System</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-900">Convenience Store</p>
          <p className="text-xs text-gray-600 mt-1">Admin User</p>
        </div>
      </div>
    </aside>
  );
}
