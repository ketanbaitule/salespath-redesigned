import { Metadata } from "next";
import { DashboardCards } from "./DashboardCard";
import { createClient } from "@/utils/supabase/server";
import SalesPersonLeadsTable from "./salesperson/[salespersonId]/_salespersonLeads/SalespersonLeadsTable";
import SalesPersonTasksTable from "./salesperson/[salespersonId]/_salespersonTasks/SalespersonTasksTable";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Icon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Salespath Dashboard",
};

export default async function Dashboard() {
  const client = await createClient();

  const agency_id = (await client.auth.getUser()).data.user?.id;
  const salesperson = await client
    .from("salesperson")
    .select("*", { count: "exact" })
    .eq("agency_id", agency_id)
    .order("created_at", { ascending: false });

  const goals = await client
    .from("goals")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  // console.log("goals", goals);

  const leads = await client.from("leads").select("*", { count: "exact" });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">Dashboard</h1>
      <DashboardCards
        salesperson={salesperson.count || 0}
        tasksCompleted={goals.count || 0}
        newLeads={leads.count || 0}
      />

      <div className="grid md:grid-cols-2 gap-8 h-[60vh]">
        <div className="overflow-y-auto space-y-3 px-4">
          <div className="flex justify-between">
            <h2 className="text-2xl">All Goals</h2>
            <Button variant="outline" asChild>
              <Link
                href="/dashboard/export?exportType=csv&exportTable=goals"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <SalesPersonTasksTable data={goals.data!} />
        </div>
        <div className="overflow-y-auto space-y-3 px-4">
          <div className="flex justify-between">
            <h2 className="text-2xl">All Leads</h2>
            <Button variant="outline" asChild>
              <Link
                href="/dashboard/export?exportType=csv&exportTable=leads"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <SalesPersonLeadsTable data={leads.data!} />
        </div>
      </div>
    </div>
  );
}
