import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import SalesPersonTasksTable from "./SalespersonTasksTable";
import AddTaskDialog from "./SalespersonAddTaskDialog";

export default async function SalespersonTasks({
  salesperson_id,
}: {
  salesperson_id: string;
}) {
  const client = await createClient();
  const { data } = await client
    .from("goals")
    .select("*")
    .eq("salesperson_id", salesperson_id)
    .order("created_at", { ascending: false });
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Manage and track assigned tasks</CardDescription>
          </div>
          <AddTaskDialog salespersonId={salesperson_id} />
        </CardHeader>
        <CardContent>
          {data === null || data?.length === 0 ? (
            <div>No tasks assigned</div>
          ) : (
            <SalesPersonTasksTable data={data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
