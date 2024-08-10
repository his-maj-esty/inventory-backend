import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { Client, ResultSet, createClient } from "@libsql/client";
import { db } from "../drizzle";
import { ExtractTablesWithRelations, eq, inArray, sql } from "drizzle-orm";
import "dotenv/config";

import * as schema from "../drizzle/schema";
import {
  Item,
  ItemInsertInput,
  ItemInsertResult,
  ItemUpdateInput,
} from "../../entities/modals/item";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { TransactionType } from "../../entities/types/bill";

export class ItemsRepository {
  private _client: Client;
  private _db: LibSQLDatabase<typeof schema>;

  constructor() {
    this._client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
    this._db = drizzle(this._client, { schema });
  }

  async getItem(
    id: string,
    tx: TransactionType = this._db
  ): Promise<Item | undefined> {
    return await tx.query.itemsTable.findFirst({
      where: eq(schema.itemsTable.id, id),
    });
  }

  async getItems(
    ids: string[],
    tx: TransactionType = this._db
  ): Promise<Item[]> {
    return await tx.query.itemsTable.findMany({
      where: inArray(schema.itemsTable.id, ids),
    });
  }
  async getAllItems(tx: TransactionType = this._db): Promise<Item[]> {
    const items = await tx.query.itemsTable.findMany({
      with: {},
    });
    return items;
  }

  async createItem(
    item: ItemInsertInput,
    tx: TransactionType = this._db
  ): Promise<ItemInsertResult> {
    const [res] = await tx
      .insert(schema.itemsTable)
      .values(item)
      .returning({ id: schema.itemsTable.id });
    return res;
  }

  async createItems(
    items: ItemInsertInput[],
    tx: TransactionType = this._db
  ): Promise<ItemInsertResult[]> {
    return await tx
      .insert(schema.itemsTable)
      .values(items)
      .returning({ id: schema.itemsTable.id });
  }

  async updateItem(
    id: string,
    item: ItemUpdateInput,
    tx: TransactionType = this._db
  ) {
    return await tx
      .update(schema.itemsTable)
      .set(item)
      .where(eq(schema.itemsTable.id, id));
  }

  async updateQuantity(
    id: string,
    quantity: number,
    tx: TransactionType = this._db
  ) {
    return await tx
      .update(schema.itemsTable)
      .set({ quantity: sql`${schema.itemsTable.quantity} - ${quantity}` })
      .where(eq(schema.itemsTable.id, id));
  }

  async deleteItem(id: string, tx: TransactionType = this._db) {
    return await tx
      .delete(schema.itemsTable)
      .where(eq(schema.itemsTable.id, id));
  }
}
