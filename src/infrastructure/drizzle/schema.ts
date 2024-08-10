import { sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
uuidv4();
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  quantity: integer("quantity").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
});

export const billsTable = sqliteTable("bills_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  date: text("date")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  amount: integer("amount").notNull(),
});

export const billedItemsTable = sqliteTable("billed_items_table", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  billId: text("bill_id")
    .notNull()
    .references(() => billsTable.id),
  itemId: text("item_id")
    .notNull()
    .references(() => itemsTable.id),
  quantity: integer("quantity").notNull(),
});
