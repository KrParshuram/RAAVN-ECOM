// app/sign-up/[[...sign-up]]/page.tsx

import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Raavn | Sign Up",
  description: "Create your account to access exclusive drops and limited-edition pieces from Raavn.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Join the Raavn collective</h1>
        <p className="text-zinc-400">Sign up to unlock early access to our limited drops and collections.</p>
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <SignUp appearance={{
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
