import { eq } from "drizzle-orm";
import "dotenv/config";

import * as schema from "../drizzle/schema";
import {
  Bill,
  BillInsertInput,
  BillInsertResult,
  BillUpdateInput,
} from "../../entities/modals/bill";
import { LibSQLDatabase, drizzle } from "drizzle-orm/libsql";
import { Client, ResultSet, createClient } from "@libsql/client";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import { TransactionType } from "../../entities/types/bill";

export class BillsRepository {
  private _client: Client;
  private _db: LibSQLDatabase<typeof schema>;

  constructor() {
    this._client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DB_AUTH_TOKEN!,
    });
    this._db = drizzle(this._client, { schema });
  }

  async getBill(
    id: string,
    tx: TransactionType = this._db
  ): Promise<Bill | undefined> {
    const res = await tx.query.billsTable.findFirst({
      where: eq(schema.billsTable.id, id),
    });

    return res;
  }

  async getBills(tx: TransactionType = this._db): Promise<Bill[]> {
    const bills = await tx.query.billsTable.findMany({
      with: {},
    });
    return bills;
  }

  async createBill(
    bill: BillInsertInput,
    tx: TransactionType = this._db
  ): Promise<BillInsertResult> {
    const [res] = await tx
      .insert(schema.billsTable)
      .values(bill)
      .returning({ id: schema.billsTable.id });
    return res;
  }

  async createBills(
    bills: BillInsertInput[],
    tx: TransactionType = this._db
  ): Promise<BillInsertResult[]> {
    return await tx
      .insert(schema.billsTable)
      .values(bills)
      .returning({ id: schema.billsTable.id });
  }

  async updateBill(
    id: string,
    bill: BillUpdateInput,
    tx: TransactionType = this._db
  ) {
    return await tx
      .update(schema.billsTable)
      .set(bill)
      .where(eq(schema.billsTable.id, id));
  }

  async deleteBill(id: string, tx: TransactionType = this._db) {
    return await tx
      .delete(schema.billsTable)
      .where(eq(schema.billsTable.id, id));
  }
}
