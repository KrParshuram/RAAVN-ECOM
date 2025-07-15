// app/unauthorized/page.tsx
export default function Unauthorized() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">403 - Access Denied</h1>
      <p className="mt-2">You are not authorized to access this page.</p>
    </div>
  );
}
