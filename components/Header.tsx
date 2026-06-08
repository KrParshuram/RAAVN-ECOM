"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { ShoppingBag, Menu, X } from "lucide-react";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export default function Header() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  );

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () =>
      setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handler);

    return () =>
      window.removeEventListener("scroll", handler);
  }, []);

  const desktopLink =
    "uppercase tracking-[0.25em] text-xs text-white/80 hover:text-white transition-colors";

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LEFT */}

          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="
                text-sm
                font-semibold
                tracking-[0.55em]
                uppercase
                text-white
              "
            >
              RAAVN
            </Link>
          </div>

          {/* DESKTOP NAV */}

          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/products"
              className={desktopLink}
            >
              Drop
            </Link>

            <a
              href="/philosophy"
              className={desktopLink}
            >
              Philosophy
            </a>

            <Link
              href="/cart"
              className="relative uppercase tracking-[0.25em] text-xs text-white/80 hover:text-white transition-colors"
            >
              Cart

              {cartCount > 0 && (
                <span className="absolute -top-3 -right-4 text-[10px] text-white">
                  ({cartCount})
                </span>
              )}
            </Link>

           
           
 
        

<SignedIn>
  <Link
    href="/account"
    className={desktopLink}
  >
    Account
  </Link>

  <UserButton
    appearance={{
      elements: {
        userButtonAvatarBox: "w-8 h-8",
      },
    }}
  />
</SignedIn>

<SignedOut>
  <SignInButton mode="modal">
    <button
      className="
        uppercase
        tracking-[0.25em]
        text-xs
        text-white/80
        hover:text-white
        transition-colors
      "
    >
      Account
    </button>
  </SignInButton>
</SignedOut>
          </nav>

          {/* MOBILE ACTIONS */}

          <div className="flex items-center gap-4 md:hidden">
            <Link
              href="/cart"
              className="relative"
            >
              <ShoppingBag className="w-5 h-5 text-white" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className="text-white"
            >
              {open ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-0
              z-40
              bg-black
              text-white
            "
          >
            <div className="h-full flex flex-col justify-center items-center text-center px-6">
              <div className="space-y-8">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="
                    block
                    text-5xl
                    font-black
                    tracking-tight
                  "
                >
                  DROP
                </Link>

                <a
                  href="#philosophy"
                  onClick={() => setOpen(false)}
                  className="
                    block
                    text-5xl
                    font-black
                    tracking-tight
                  "
                >
                  PHILOSOPHY
                </a>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="
                    block
                    text-5xl
                    font-black
                    tracking-tight
                  "
                >
                  CART
                </Link>

                <SignedIn>
                  <div className="flex justify-center pt-6">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox:
                            "w-12 h-12",
                        },
                      }}
                    />
                  </div>
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className="
                        mt-6
                        uppercase
                        tracking-[0.3em]
                        text-sm
                        text-zinc-400
                      "
                    >
                      ACCOUNT
                    </button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}