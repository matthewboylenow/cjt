import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Login page doesn't need the admin shell
  // Middleware handles redirect for unauthenticated users
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminShell
      userName={session.user?.name ?? "Admin"}
      userEmail={session.user?.email ?? ""}
    >
      {children}
    </AdminShell>
  );
}
