import { z } from "zod";

export const BilledItemSchema = z.object({
  id: z.string().uuid(),
  billId: z.string().uuid(),
  itemId: z.string().uuid(),
  quantity: z.number().int(),
});

export type BilledItem = Required<z.infer<typeof BilledItemSchema>>;

export type BilledItemInsertInput = Pick<
  BilledItem,
  "billId" | "itemId" | "quantity"
>;
export type BilledItemInsertResult = Pick<BilledItem, "id">;

export type BilledItemUpdateInput = Partial<BilledItem>;
