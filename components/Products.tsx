"use client";

import { useState } from "react";
import { Package, Filter } from "lucide-react";
import { useInventoryStore } from "@/store/inventoryStore";

export default function Products() {
  const { products } = useInventoryStore();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Product Catalog</h2>
        <p className="text-gray-600 mt-1">Browse and manage your product lineup</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <Filter size={20} className="text-gray-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 h-40 flex items-center justify-center">
              <Package size={48} className="text-white" />
            </div>
            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {product.category}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">SKU: {product.sku}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <span className={`text-sm font-medium ${product.quantity <= product.reorderLevel ? 'text-red-600' : 'text-green-600'}`}>
                  {product.quantity} in stock
                </span>
              </div>
              {product.quantity <= product.reorderLevel && (
                <div className="mt-3 bg-red-50 text-red-700 text-xs px-3 py-2 rounded-lg">
                  Low stock - Reorder needed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
