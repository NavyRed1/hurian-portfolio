import { Sidebar } from "@/components/admin/sidebar";

// Route protection itself happens in middleware.ts (updateSession), which
// redirects unauthenticated requests to /admin/login before this renders.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">{children}</div>
    </div>
  );
}
