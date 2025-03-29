"use client";

import { DataViewer } from "@/components/data-viewer";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Salesperson } from "@/types/salesperson";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import SalespersonAvatar from "@/assets/svg/salesperson.svg";

export default function SalespersonView({ salesperson }: { salesperson: any }) {
  const columns: ColumnDef<Salesperson>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Created At",
      accessorKey: "created_at",
    },
    {
      header: "Details",
      // You can use a custom cell renderer here for the "Details" column
      cell: ({ row }) => (
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/salesperson/${row.original.id}`}>
            View Details
          </Link>
        </Button>
      ),
    },
  ];
  return (
    <div className="px-5 py-3 w-full">
      <DataViewer
        categories={[]}
        products={salesperson}
        columns={columns}
        GridCard={CustomGridCard}
        placeholderText="Search Salesperson..."
      />
    </div>
  );
}

function CustomGridCard({ product }: { product: Salesperson }) {
  const salesperson = product;
  return (
    <Card key={salesperson.id}>
      <CardHeader className="flex items-center gap-4">
        <Image
          src={SalespersonAvatar}
          alt={`${salesperson.name} Avatar`}
          width={40}
          height={40}
        />
        <CardTitle>{salesperson.name}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/salesperson/${salesperson.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
