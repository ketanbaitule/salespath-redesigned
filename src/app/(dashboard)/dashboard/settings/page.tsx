import { createClient } from "@/utils/supabase/server";
import { AgencySettings } from "./AgencySetting";
import { SalespersonSettings } from "./SalespersonSetting";
import { SettingsHeader } from "./SettingHeader";
import { Toaster } from "@/components/ui/sonner";

export default async function SettingPage() {
  const client = await createClient();
  const agency = await client.from("agency").select("*").limit(1).single();
  const agencyData = {
    agency_name: agency.data.agency_name,
    phone_no: agency.data.phone_no,
    address: agency.data.address,
  };

  const salesPerson = await client
    .from("salesperson")
    .select("*")
    .then((data) => {
      return data.data?.map((salesPerson) => {
        return {
          id: salesPerson.salesperson_id,
          name: salesPerson.name,
          initials: salesPerson.name
            .split(" ")
            .map((n: string) => n[0])
            .join(""),
        };
      });
    });

  return (
    <div className="flex flex-col gap-6 p-6">
      <SettingsHeader />
      <div className="grid gap-6">
        <AgencySettings agencyData={agencyData} />
        <SalespersonSettings salespeople={salesPerson || []} />
      </div>
      <Toaster />
    </div>
  );
}
