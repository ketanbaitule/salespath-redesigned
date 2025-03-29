import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Salesperson } from "@/types/salesperson";
import SalespersonInfo from "./SalespersonInfo";
import { Distance } from "@mmit/latlong";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalespersonLeads from "./SalespersonLeads";
import SalespersonTasks from "./SalespersonTasks";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Salesperson | Salespath",
};

export default async function SalespersonPage({
  params,
}: {
  params: Promise<{ salespersonId: string }>;
}) {
  const salespersonId = (await params).salespersonId;
  const client = await createClient();
  const { data } = await client
    .from("salesperson")
    .select("*")
    .eq("salesperson_id", salespersonId)
    .limit(1)
    .single();
  if (data === null) {
    return <div>Salesperson cannot be found</div>;
  }
  const salesperson: Salesperson = {
    id: data.salesperson_id,
    name: data.name,
    email: data.email,
    phone: data.phone_number,
    created_at: data.created_at,
  };

  // Salesperson Tasks
  const salespersonTask = await client
    .from("goals")
    .select("*")
    .eq("salesperson_id", salesperson.id);

  const locationHistory = await client
    .from("location_tracker")
    .select("*")
    .eq("salesperson_id", salesperson.id)
    .order("datetime", { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
        return [];
      }
      return data.map((location) => ({
        datetime: location.created_at,
        lat: location.lat,
        long: location.long,
      }));
    });

  const distance = new Distance();

  const distanceThreshold = 500; // in meters

  return (
    <div className="px-10 py-5 w-full">
      <SalespersonInfo salesperson={salesperson} />
      <div className="grid grid-cols-1 grid-cols-2 py-10 gap-5">
        <div className="px-5">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="payout">Payout</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="mt-6">
              <SalespersonTasks salesperson_id={salesperson.id} />
            </TabsContent>
            <TabsContent value="leads" className="mt-6">
              <SalespersonLeads salesperson_id={salesperson.id} />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          1{/* <MapView salesperson_id={salesperson.id} _polyline={[]} /> */}
          {/* <LocationTracker salesperson_id={salesperson.id} trips={trips} /> */}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
