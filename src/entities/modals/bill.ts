import { TypeOf, z } from "zod";

export const BillSchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  amount: z.number().int(),
});

export type Bill = Required<z.infer<typeof BillSchema>>;

export type BillInsertInput = Pick<Bill, "amount">;
export type BillInsertResult = Pick<Bill, "id">;

export type BillUpdateInput = Partial<Bill>;
