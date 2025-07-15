"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabaseBrowser";

export default function ClerkSyncClient() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const syncUser = async () => {
      const { error } = await supabase
        .from("user_profiles")
        .upsert(
             { clerk_id: user.id },          // no "id" field → default generates UUID
            { onConflict: "clerk_id" } 
        ); // Clerk ID (user_xxx)

      if (error) console.error("Error syncing user:", error.message);
    };

    syncUser();
  }, [isSignedIn, user]);

  return null; // invisible
}
