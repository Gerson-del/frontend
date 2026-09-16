import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/organisms/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-screen">
        <Header />

        <main className="mx-auto w-full max-w-7xl px-3 py-3">{children}</main>
      </div>
    </AuthGuard>
  );
}