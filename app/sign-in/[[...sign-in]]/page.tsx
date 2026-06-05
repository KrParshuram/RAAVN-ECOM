import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Raavn",
  description: "Access your Raavn account to view orders and exclusive drops.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome Back to Raavn</h1>
        <p className="text-zinc-400">Log in to access exclusive drops and your dashboard.</p>
        <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg">
          <SignIn
            appearance={{
              elements: {
                card: "bg-zinc-900 border border-zinc-800",
                formButtonPrimary: "bg-white text-black hover:bg-zinc-200",
              },
              variables: {
                colorPrimary: "#ffffffff",
                colorBackground: "#000000ff",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}
