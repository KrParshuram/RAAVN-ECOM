// app/sign-in/[[...sign-in]]/page.tsx

import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Raavn",
  description: "Welcome back. Sign in to explore limited-edition drops by Raavn.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back to Raavn</h1>
        <p className="text-zinc-400">Sign in to access exclusive drops and track your orders.</p>
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <SignIn appearance={{
            elements: {
              formButtonPrimary: "bg-white text-black hover:bg-zinc-200",
              card: "bg-zinc-900 border border-zinc-800",
            },
            variables: {
              colorPrimary: "#ffffff",
              colorBackground: "#000000",
            },
          }} />
        </div>
      </div>
    </main>
  );
}
