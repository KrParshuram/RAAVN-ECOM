import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Raavn",
  description:
    "Access your Raavn account and personal collection.",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}

          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-zinc-500 mb-8">
              Raavn
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              I'M NOT
              <br />
              YOUR GOD.
            </h1>

            <h2 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-zinc-700">
              I'M NOT
              <br />
              YOUR VILLAIN.
            </h2>

            <p className="mt-12 max-w-md text-zinc-400 text-lg">
              Access your collection,
              saved pieces and future drops.
            </p>
          </div>

          {/* Right Side */}

          <div className="flex justify-center lg:justify-end">
            <SignIn
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
                  colorPrimary: "#ffffff",
                  colorBackground: "#000000",
                  colorText: "#ffffff",
                },
              }}
            />
          </div>

        </div>
      </div>
    </main>
  );
}