import { z } from "zod";

export type Salesperson = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export type SalespersonTask = {
  id: number;
  goal: string;
  start_time: string;
  end_time: string;
  lat: number;
  long: number;
  salesperson_id: string;
};

export const addSalespersonTaskSchema = z.object({
  goal: z.string(),
  lat: z.coerce.number(),
  long: z.coerce.number(),
});
