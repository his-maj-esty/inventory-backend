import "dotenv/config";

import { eq } from "drizzle-orm";

import * as schema from "../drizzle/schema";
import {
  BilledItem,
  BilledItemInsertInput,
  BilledItemInsertResult,
  BilledItemUpdateInput,
} from "../../entities/modals/billedItem";
import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { Client, createClient } from "@libsql/client";
import { TransactionType } from "../../entities/types/bill";
export class BilledItemsRepository {
  private _client: Client;
  private _db: LibSQLDatabase<typeof schema>;

  constructor() {
    this._client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
    this._db = drizzle(this._client, { schema });
  }

  async getBilledItem(
    id: string,
    tx: TransactionType = this._db
  ): Promise<BilledItem | undefined> {
    const res = await tx.query.billedItemsTable.findFirst({
      where: eq(schema.billedItemsTable.id, id),
    });
    return res;
  }

  async getBilledItems(
    id: string,
    tx: TransactionType = this._db
  ): Promise<BilledItem[]> {
    return await tx.query.billedItemsTable.findMany({
      where: eq(schema.billedItemsTable.id, id),
    });
  }

  async getBilledItemsByBillId(
    billId: string,
    tx: TransactionType = this._db
  ): Promise<BilledItem[]> {
    return await tx.query.billedItemsTable.findMany({
      where: eq(schema.billedItemsTable.billId, billId),
    });
  }

  async createBilledItem(
    billedItem: BilledItemInsertInput,
    tx: TransactionType = this._db
  ): Promise<BilledItemInsertResult> {
    const [res] = await tx
      .insert(schema.billedItemsTable)
      .values(billedItem)
      .returning({ id: schema.billedItemsTable.id });
    return res;
  }

  async createBilledItems(
    billedItems: BilledItemInsertInput[],
    tx: TransactionType = this._db
  ): Promise<BilledItemInsertResult[]> {
    return await tx
      .insert(schema.billedItemsTable)
      .values(billedItems)
      .returning({ id: schema.billedItemsTable.id });
  }

  async updateBilledItem(
    id: string,
    billedItem: BilledItemUpdateInput,
    tx: TransactionType = this._db
  ) {
    return await tx
      .update(schema.billedItemsTable)
      .set(billedItem)
      .where(eq(schema.billedItemsTable.id, id));
  }

  async deleteBilledItem(id: string, tx: TransactionType = this._db) {
    return await tx
      .delete(schema.billedItemsTable)
      .where(eq(schema.billedItemsTable.id, id));
  }
}
