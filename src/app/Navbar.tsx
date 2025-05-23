import HeaderAuth from "@/components/header-auth";
import SidebarAuthButton from "@/components/sidebar-auth";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center py-3 px-10 md:px-20 text-sm">
        <div className="flex gap-5 items-center font-semibold text-lg uppercase">
          <SidebarAuthButton />
          <Link href={"/"}>Salespath</Link>
        </div>
        <HeaderAuth />
      </div>
    </nav>
  );
}
