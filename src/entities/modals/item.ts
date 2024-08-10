import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().int(),
  name: z.string(),
  description: z.string(),
  price: z.number().int(),
});

export type Item = z.infer<typeof ItemSchema>;

export type ItemInsertInput = Omit<Item, "id">;
export type ItemInsertResult = Pick<Item, "id">;

export type ItemUpdateInput = Partial<Item>;
export type ItemUpdateResult = Pick<Item, "id">;

export type ItemDeleteInput = Pick<Item, "id">;

export type ItemSelectInput = Pick<Item, "id">;
export type ItemSelectResult = Item;
