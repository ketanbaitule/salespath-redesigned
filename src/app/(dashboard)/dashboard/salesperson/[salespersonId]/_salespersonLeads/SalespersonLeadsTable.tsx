"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SalespersonLeads } from "@/types/salesperson";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ViewLeadDialog } from "./SalespersonLeadDialog";
import { useState } from "react";

export default function SalesPersonLeadsTable({
  data,
}: {
  data: SalespersonLeads[];
}) {
  const [selectedLead, setSelectedLead] = useState<SalespersonLeads | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const columns: ColumnDef<SalespersonLeads>[] = [
    {
      header: "Lead Id",
      accessorKey: "id",
    },
    {
      header: "Lead Name",
      accessorKey: "name",
    },
    {
      header: "Lead Email",
      accessorKey: "email",
    },
    {
      header: "Lead Phone",
      accessorKey: "number",
    },
    {
      header: "Lead Notes",
      accessorKey: "notes",
    },
    {
      header: "Lead Found At (Goal)",
      accessorKey: "tasks.goal",
    },
    {
      header: "More",
      cell: ({ row }) => (
        <LeadTableActionBar
          lead={row.original}
          setIsDialogOpen={setIsDialogOpen}
          setSelectedLead={setSelectedLead}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data!} />
      {selectedLead !== null && (
        <ViewLeadDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          lead={selectedLead}
        />
      )}
    </>
  );
}

function LeadTableActionBar({
  lead,
  setIsDialogOpen,
  setSelectedLead,
}: {
  lead: SalespersonLeads;
  setIsDialogOpen: (isOpen: boolean) => void;
  setSelectedLead: (lead: SalespersonLeads | null) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setIsDialogOpen(true);
            setSelectedLead(lead);
          }}
        >
          View details
        </DropdownMenuItem>
        <DropdownMenuItem>Update status</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
