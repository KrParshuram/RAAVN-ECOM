// app/sign-up/[[...sign-up]]/page.tsx

import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Raavn",
  description:
    "Create your account and gain access to future drops, saved pieces, and your personal collection.",
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-8">
              Join Raavn
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              THE STORY
              <br />
              STARTS
              <br />
              HERE.
            </h1>

            <p className="mt-12 max-w-md text-zinc-400 text-lg leading-relaxed">
              Create your account to save pieces,
              track orders and gain access to future drops.
            </p>

            <div className="mt-16 space-y-3 text-sm text-zinc-500">
              <p>Limited production runs.</p>
              <p>Exclusive releases.</p>
              <p>Built for people who stopped asking for permission.</p>
            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center lg:justify-end">

            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",

                  card: `
                    bg-transparent
                    shadow-none
                    border
                    border-zinc-800
                    rounded-none
                  `,

                  headerTitle: "text-white",

                  headerSubtitle: "text-zinc-500",

                  formFieldLabel:
                    "text-zinc-400",

                  formFieldInput: `
                    bg-black
                    border-zinc-700
                    text-white
                  `,

                  footerActionText:
                    "text-zinc-500",

                  footerActionLink:
                    "text-white",

                  socialButtonsBlockButton: `
                    bg-black
                    border-zinc-700
                    text-white
                  `,

                  formButtonPrimary: `
                    bg-white
                    text-black
                    hover:bg-zinc-200
                  `,
                },

                variables: {
                  colorPrimary: "#000000",
                  colorBackground: "#ffffff",
                  colorText: "#000000",
                },
              }}
            />

          </div>

        </div>

      </div>
    </main>
  );
}