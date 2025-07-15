// /app/api/users/route.ts
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const client = await clerkClient();
    const users = await client.users.getUserList();
    return Response.json(users);
  } catch (err) {
    console.error("Failed to fetch Clerk users", err);
    return new Response("Error", { status: 500 });
  }
}
