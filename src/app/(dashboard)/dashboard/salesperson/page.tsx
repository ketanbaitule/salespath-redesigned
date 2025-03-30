import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import SalespersonView from "./SalespersonView";
import { Salesperson } from "@/types/salesperson";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Salesperson | Salespath",
};

export default async function SalespersonPage() {
  const client = await createClient();
  const { data, error } = await client.from("salesperson").select("*");
  if (data === null) {
    return <div>There are no salespersons</div>;
  }
  const salespersons: Salesperson[] = data.map((person) => {
    return {
      id: person.salesperson_id,
      name: person.name,
      email: person.email,
      phone: person.phone_number,
      created_at: person.created_at,
    };
  });
  return (
    <div className="px-5 py-3 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl tracking-tight">Sales Team</h1>
        <Button asChild>
          <Link href="/dashboard/settings">Add Salesperson</Link>
        </Button>
      </div>
      <div>
        <SalespersonView salesperson={salespersons} />
      </div>
    </div>
  );
}
