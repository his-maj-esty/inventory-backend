import { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "../../infrastructure/drizzle/schema";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { ResultSet } from "@libsql/client/.";
import { ExtractTablesWithRelations } from "drizzle-orm";

export interface IBill {
  id: string;
  date: string;
  amount: number;
  items: IitemsWithQuantity[];
}

export interface IitemsWithQuantity {
  id: string;
  quantity: number;
  name: string;
}

export type TransactionType =
  | LibSQLDatabase<typeof schema>
  | SQLiteTransaction<
      "async",
      ResultSet,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >;
