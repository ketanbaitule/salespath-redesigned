import { createClient } from "@/utils/supabase/server";
import { SidebarTrigger } from "./ui/sidebar";

export default async function SidebarAuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4 block md:hidden">
      <SidebarTrigger />
    </div>
  ) : (
    <div className="flex gap-2"></div>
  );
}
