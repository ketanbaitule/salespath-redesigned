import { AppSidebar } from "./app-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex gap-4">
      <div>
        <AppSidebar />
      </div>
      <div className="p-5 w-full h-full">{children}</div>
    </div>
  );
}
