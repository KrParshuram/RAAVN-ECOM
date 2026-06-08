import { ReactNode } from "react";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[260px_1fr] gap-16">
          <AccountSidebar />

          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}