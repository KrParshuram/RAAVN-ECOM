"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShoppingCart, Menu, X } from "lucide-react";
import clsx from "clsx";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";



export default function Header() {

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );


  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);


  const [open, setOpen] = useState(false);

  const linkClass =
    "block py-2 md:py-0 hover:text-primary transition-colors font-medium";

  return (
    <header
      className={clsx(
        "fixed inset-x-0 z-50 transition-colors backdrop-blur",
        scrolled ? "bg-white/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={clsx(
            "text-xl font-extrabold tracking-widest",
            scrolled ? "text-primary" : "text-white"
          )}
        >
          RAAVN
        </Link>

        {/* Desktop nav */}
        <nav
          className={clsx(
            "hidden md:flex items-center gap-8",
            scrolled ? "text-gray-800" : "text-white"
          )}
        >
          <Link href="/products" className={linkClass}>
            DROP EXCLUSIVES
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className={clsx("w-6 h-6", scrolled ? "text-gray-800" : "text-white")} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth area */}
          <SignedIn>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">
                Sign&nbsp;in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10">
                Sign&nbsp;up
              </button>
            </SignUpButton>
          </SignedOut>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
         {open ? (
            <X className={clsx("w-6 h-6", scrolled ? "text-gray-800" : "text-white")} />
          ) : (
            <Menu className={clsx("w-6 h-6", scrolled ? "text-gray-800" : "text-white")} />
          )}

        </button>
      </div>

      {/* Mobile slide‑down */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white shadow-inner"
          >
            <div className="px-4 pb-4 flex flex-col gap-4 text-gray-800">
              <Link href="/products" className={linkClass} onClick={() => setOpen(false)}>
                Products
              </Link>

              <Link href="/cart" className="relative" onClick={() => setOpen(false)}>
                <ShoppingCart className="w-6 h-6 inline-block" />
                <span className="ml-2">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <SignedIn>
                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="w-full px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
