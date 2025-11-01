"use client";

import { useState } from "react";
import { Download, FileText, Package, TrendingUp, DollarSign } from "lucide-react";
import { useInventoryStore } from "@/store/inventoryStore";
import { generateInventoryReport, generateSalesReport, generateVendorReport, generateLowStockReport } from "@/utils/reportGenerator";

export default function Reports() {
  const { products, orders, vendors } = useInventoryStore();
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = async (type: string) => {
    setGenerating(true);
    try {
      switch (type) {
        case "inventory":
          await generateInventoryReport(products);
          break;
        case "sales":
          await generateSalesReport(orders);
          break;
        case "vendors":
          await generateVendorReport(vendors);
          break;
        case "lowstock":
          await generateLowStockReport(products);
          break;
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setGenerating(false);
    }
  };

  const reportTypes = [
    {
      id: "inventory",
      title: "Inventory Report",
      description: "Complete inventory status with stock levels and values",
      icon: Package,
      color: "blue",
    },
    {
      id: "sales",
      title: "Sales Report",
      description: "Sales performance and order analysis",
      icon: TrendingUp,
      color: "green",
    },
    {
      id: "vendors",
      title: "Vendor Report",
      description: "Vendor information and contact details",
      icon: FileText,
      color: "purple",
    },
    {
      id: "lowstock",
      title: "Low Stock Alert Report",
      description: "Products requiring immediate reorder",
      icon: DollarSign,
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Reports Generator</h2>
        <p className="text-gray-600 mt-1">Generate and download business reports in PDF format</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(report.color)}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <button
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={generating}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <Download size={16} />
                    {generating ? "Generating..." : "Generate PDF"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Vendors</p>
            <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
