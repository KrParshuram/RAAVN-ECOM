"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    label: "Overview",
    href: "/account",
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
  },
  {
    label: "Recently Viewed",
    href: "/account/recently-viewed",
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside>
      <div className="sticky top-32">
        <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-8">
          Account
        </p>

        <h2 className="text-3xl font-black mb-12">
          MY COLLECTION
        </h2>

        <nav className="space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block transition-colors",
                pathname === link.href
                  ? "text-white"
                  : "text-zinc-500 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}