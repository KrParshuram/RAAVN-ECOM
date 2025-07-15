// components/NewsletterSection.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailIcon } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter an email.");
    // TODO: Integrate with Supabase or Email API
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <section className="w-full bg-black text-white px-6 py-16 flex flex-col items-center gap-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center">Subscribe to Our Newsletter</h2>
      <p className="text-gray-300 text-center max-w-xl">
        Stay updated with the latest drops, offers, and behind-the-scenes content from Raavn.
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <Input
          type="email"
          placeholder="Enter your email"
          className="bg-white text-black px-4 py-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubscribe} className="flex items-center gap-2">
          <MailIcon size={18} />
          Subscribe
        </Button>
      </div>
    </section>
  );
}
