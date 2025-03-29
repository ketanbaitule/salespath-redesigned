"use client";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SalespersonTask } from "@/types/salesperson";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export default function SalesPersonTasksTable({
  data,
}: {
  data: SalespersonTask[];
}) {
  const columns: ColumnDef<SalespersonTask>[] = [
    {
      header: "Task Id",
      accessorKey: "id",
    },
    {
      header: "Task Name",
      accessorKey: "goal",
    },
    {
      header: "Task Status",
      cell: ({ row }) => {
        if (row.original.start_time === null) {
          return <Badge variant={"destructive"}>Not Started</Badge>;
        } else if (row.original.end_time === null) {
          return <Badge variant={"warning"}>In Progress</Badge>;
        } else {
          return <Badge variant={"success"}>Completed</Badge>;
        }
      },
    },
    {
      header: "Location",
      cell: ({ row }) => {
        return (
          <Button variant="outline" className="w-full" asChild>
            <Link
              href={`https://www.google.com/maps?q=${row.original.lat},${row.original.long}`}
              target="_blank"
            >
              View Location
            </Link>
          </Button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data!} />;
}
