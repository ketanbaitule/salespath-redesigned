"use server";

import { addSalespersonTaskSchema } from "@/types/salesperson";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function submitAddTaskToSalesperson(
  formData: z.infer<typeof addSalespersonTaskSchema>,
  salesperson_id: string
) {
  const client = await createClient();
  const { data, error } = await client
    .from("goals")
    .insert({ ...formData, salesperson_id: salesperson_id });
  if (error) {
    console.error(error.message);
    return { error: error.message };
  }
  revalidatePath("/dashboard/salesperson/", "page");
  return { data: data };
}
