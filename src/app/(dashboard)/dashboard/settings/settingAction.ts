"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateAgencyDetails(
  agency_name: string,
  phone_no: string,
  address: string
) {
  const client = await createClient();
  const res = await client
    .from("agency")
    .update({
      agency_name: agency_name,
      phone_no: phone_no,
      address: address,
    })
    .eq("salesperson_id", (await client.auth.getUser()).data.user?.id);

  revalidatePath("/dashboard/settings", "page");

  return res.error === null;
}

export async function createNewSalesPerson(
  email: string,
  password: string,
  name: string
) {
  const client = await createClient(true);
  const { data, error } = await client.auth.admin.createUser({
    email: email,
    password: password,
    user_metadata: {
      name: name,
    },
  });

  if (error) {
    console.error("Error creating user:", error);
    if (error.status === 422) {
      return {
        error: "User already exists",
      };
    }
    return null;
  }

  await addSalespersonSetting(data.user?.id as string, name);

  return error === null;
}

export async function addSalespersonSetting(uuid: string, name: string) {
  const client = await createClient();
  const res = await client.from("salesperson").insert([
    {
      salesperson_id: uuid,
      name: name,
    },
  ]);

  revalidatePath("/dashboard/settings", "page");

  console.log(res);

  return res.error === null;
}

export async function deleteSalespersonSetting(uuid: string) {
  const client = await createClient();
  const res = await client
    .from("salesperson")
    .delete()
    .eq("salesperson_id", uuid);

  revalidatePath("/dashboard/settings", "page");

  return res.error === null;
}
