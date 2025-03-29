import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import SalesPersonLeadsTable from "./SalespersonLeadsTable";
import AddTaskDialog from "./SalespersonLeadDialog";

export default async function SalespersonLeads({
  salesperson_id,
}: {
  salesperson_id: string;
}) {
  const client = await createClient();
  const { data } = await client
    .from("leads")
    .select("*, tasks(*)")
    .eq("salesperson_id", salesperson_id)
    .order("created_at", { ascending: false });
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leads</CardTitle>
            <CardDescription>Manage and track sales leads</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {data === null || data?.length === 0 ? (
            <div>No leads added</div>
          ) : (
            <SalesPersonLeadsTable data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
