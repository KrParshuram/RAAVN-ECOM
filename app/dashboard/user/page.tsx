"use client";

import { useEffect, useState } from "react";

export default function UserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    if (!res.ok) {
      console.error("Failed to load users");
      return;
    }

    const result = await res.json();
    // Fix: Make sure to extract `data` array
    setUsers(result.data); // not `result`
    setLoading(false);
  };

  fetchUsers();
}, []);


  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">User List</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-neutral-900 border border-neutral-700 rounded-xl p-4"
            >
              <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
              <p className="text-gray-400">{user.emailAddresses?.[0]?.emailAddress}</p>
              <p className="text-xs text-gray-500">User ID: {user.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
