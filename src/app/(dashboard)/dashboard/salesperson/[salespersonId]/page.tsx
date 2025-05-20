import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { Salesperson } from "@/types/salesperson";
import SalespersonInfo from "./SalespersonInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import SalespersonTasks from "./_salespersonTasks/SalespersonTasks";
import SalespersonLeads from "./_salespersonLeads/SalespersonLeads";
import SalespersonLocation from "./_salespersonLocation/SalespersonLocation";
import LocationMapView from "./_salespersonMapView/LocationMapView";

export const metadata: Metadata = {
  title: "Salesperson | Salespath",
};

export default async function SalespersonPage({
  params,
  searchParams,
}: {
  params: Promise<{ salespersonId: string }>;
  searchParams: Promise<
    { tripStartId: string; tripEndId: string; page: string } | undefined | null
  >;
}) {
  const searchParam = await searchParams;
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

  return (
    <div className="px-0 md:px-10 py-5 w-full">
      <SalespersonInfo salesperson={salesperson} />
      <div className="grid grid-cols-1 py-10 gap-5">
        <div className="px-5">
          <Tabs
            defaultValue={searchParam?.page ? searchParam.page : "tasks"}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="trips">Trips</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="mt-6">
              <SalespersonTasks salesperson_id={salesperson.id} />
            </TabsContent>
            <TabsContent value="leads" className="mt-6">
              <SalespersonLeads salesperson_id={salesperson.id} />
            </TabsContent>
            <TabsContent value="trips" className="mt-6">
              <SalespersonLocation salesperson_id={salesperson.id} />
            </TabsContent>
            <TabsContent value="location" className="mt-6">
              <LocationMapView
                salesperson_id={salesperson.id}
                searchParams={searchParam}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
