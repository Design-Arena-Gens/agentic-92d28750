import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  reorderLevel: number;
}

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  paymentTerms: string;
}

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
}

interface InventoryStore {
  products: Product[];
  vendors: Vendor[];
  orders: Order[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

const initialProducts: Product[] = [
  { id: "1", sku: "BEV001", name: "Coca Cola 500ml", category: "Beverages", quantity: 45, price: 1.99, reorderLevel: 20 },
  { id: "2", sku: "SNK001", name: "Lays Classic Chips", category: "Snacks", quantity: 12, price: 2.49, reorderLevel: 15 },
  { id: "3", sku: "DRY001", name: "Milk 1L", category: "Dairy", quantity: 8, price: 3.99, reorderLevel: 10 },
  { id: "4", sku: "HOU001", name: "Paper Towels", category: "Household", quantity: 25, price: 4.99, reorderLevel: 10 },
  { id: "5", sku: "SNK002", name: "Doritos Nacho", category: "Snacks", quantity: 18, price: 2.99, reorderLevel: 15 },
];

const initialVendors: Vendor[] = [
  { id: "1", name: "Beverage Distributors Inc", email: "contact@bevdist.com", phone: "+1-555-0101", address: "123 Main St, City, State 12345", category: "Beverages", paymentTerms: "Net 30" },
  { id: "2", name: "Snack World Supply", email: "sales@snackworld.com", phone: "+1-555-0102", address: "456 Oak Ave, City, State 12345", category: "Snacks", paymentTerms: "Net 45" },
  { id: "3", name: "Fresh Dairy Co", email: "info@freshdairy.com", phone: "+1-555-0103", address: "789 Pine Rd, City, State 12345", category: "Dairy", paymentTerms: "Net 15" },
];

const initialOrders: Order[] = [
  {
    id: "1",
    orderNumber: "PO-001234",
    vendorId: "1",
    vendorName: "Beverage Distributors Inc",
    date: new Date().toISOString(),
    items: [{ productId: "1", productName: "Coca Cola 500ml", quantity: 50, price: 1.99 }],
    totalAmount: 99.50,
    status: "pending",
  },
];

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      vendors: initialVendors,
      orders: initialOrders,
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
      addVendor: (vendor) =>
        set((state) => ({ vendors: [...state.vendors, vendor] })),
      updateVendor: (id, updatedVendor) =>
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === id ? { ...v, ...updatedVendor } : v)),
        })),
      deleteVendor: (id) =>
        set((state) => ({ vendors: state.vendors.filter((v) => v.id !== id) })),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    {
      name: "inventory-storage",
    }
  )
);
