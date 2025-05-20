import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params = await searchParams;

  const exportType = params.get("exportType") || "csv";
  const exportTable = params.get("exportTable") || "goals";

  const client = await createClient();
  const agency_id = (await client.auth.getUser()).data.user?.id;
  const salesperson = (
    await client
      .from("salesperson")
      .select("*")
      .eq("agency_id", agency_id)
      .order("created_at", { ascending: false })
  ).data;

  if (exportTable == "leads") {
    const leads = await client
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    const data = leads.data?.map((lead) => {
      const salespersonData = salesperson?.find(
        (salesperson) => salesperson.salesperson_id === lead.salesperson_id
      );
      return {
        ...lead,
        salesperson_name: salespersonData?.name,
        salesperson_email: salespersonData?.email,
        salesperson_phone: salespersonData?.phone_number,
        salesperson_id: salespersonData?.id,
      };
    });
    if (data === null || data === undefined) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    if (exportType === "csv") {
      const csv = [
        [
          "Salesperson Name",
          "Salesperson Email",
          "Salesperson Phone",
          "Lead Name",
          "Lead Email",
          "Lead Phone",
          "Lead Organization",
          "Lead Note",
        ],
        ...data.map((lead) => [
          lead.salesperson_name,
          lead.salesperson_email,
          lead.salesperson_phone,
          lead.name,
          lead.email,
          lead.number,
          lead.organization,
          lead.note,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="leads.csv"`,
        },
      });
    }
    return NextResponse.json(data);
  } else {
    const goals = await client
      .from("goals")
      .select("*")
      .order("created_at", { ascending: false });

    const data = goals.data?.map((goal) => {
      const salespersonData = salesperson?.find(
        (salesperson) => salesperson.salesperson_id === goal.salesperson_id
      );
      return {
        ...goal,
        salesperson_name: salespersonData?.name,
        salesperson_email: salespersonData?.email,
        salesperson_phone: salespersonData?.phone_number,
        salesperson_id: salespersonData?.id,
      };
    });

    if (data === null || data === undefined) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    if (exportType === "csv") {
      const csv = [
        [
          "Salesperson Name",
          "Salesperson Email",
          "Salesperson Phone",
          "Goal",
          "Status",
        ],
        ...data.map((goal) => {
          const status =
            goal.start_time === null
              ? "Not Started"
              : goal.end_time === null
                ? "In Progress"
                : "Completed";
          return [
            goal.salesperson_name,
            goal.salesperson_email,
            goal.salesperson_phone,
            goal.goal,
            status,
          ];
        }),
      ]
        .map((e) => e.join(","))
        .join("\n");

      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="goals.csv"`,
        },
      });
    }

    return NextResponse.json(data);
  }
  return NextResponse.json({ error: "No data found" }, { status: 404 });
}
