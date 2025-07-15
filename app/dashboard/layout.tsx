// app/dashboard/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 text-white p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard/user" className="hover:text-blue-400">User</Link>
          <Link href="/dashboard/products" className="hover:text-blue-400">Products</Link>
          <Link href="/dashboard/add-product" className="hover:text-blue-400">Add Product</Link>
          <Link href="/dashboard/orders" className="hover:text-blue-400">Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-black">
        {children}
      </main>
    </div>
  );
}
