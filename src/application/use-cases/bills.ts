import { Bill } from "../../entities/modals/bill";
import { IBill, IitemsWithQuantity } from "../../entities/types/bill";
import { db } from "../../infrastructure/drizzle/index";
import { BilledItemsRepository } from "../../infrastructure/repositories/billedItems";
import { BillsRepository } from "../../infrastructure/repositories/bills";
import { ItemsRepository } from "../../infrastructure/repositories/items";

const billsRepo = new BillsRepository();
const itemsRepo = new ItemsRepository();
const billItemsRepo = new BilledItemsRepository();
export async function createBillUseCase(
  items: IitemsWithQuantity[]
): Promise<string> {
  const itemsFromDb = await itemsRepo.getItems(items.map((item) => item.id));

  const missingItems = items.filter(
    (item) => !itemsFromDb.some((dbItem) => dbItem.id === item.id)
  );
  if (missingItems.length > 0) {
    throw new Error(
      `Items with ids ${missingItems
        .map((item) => item.id)
        .join(", ")} not found`
    );
  }

  items.forEach((item) => {
    const dbItem = itemsFromDb.find((dbItem) => dbItem.id === item.id);

    if (dbItem && dbItem.quantity < item.quantity) {
      throw new Error(
        `Insufficient quantity for item with id ${item.id}. Available: ${dbItem.quantity}, Requested: ${item.quantity}`
      );
    }
  });

  const amountsArray = items.map((item) => {
    const dbItem = itemsFromDb.find((dbItem) => dbItem.id === item.id);
    return dbItem!.price * item.quantity;
  });
  const totalAmount = amountsArray.reduce((acc, curr) => acc + curr, 0);
  // all these bill creation steps is in a drizzle transaction
  const billId = await db.transaction(async (tx) => {
    const newBill = await billsRepo.createBill({ amount: totalAmount }, tx);
    const billedItems = items.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
      billId: newBill.id,
    }));

    await billItemsRepo.createBilledItems(billedItems, tx);
    items.forEach(async (item) => {
      await itemsRepo.updateQuantity(item.id, item.quantity, tx);
    });

    return newBill.id;
  });
  return billId;
}

export async function getAllBillsUseCase(): Promise<Bill[]> {
  return await billsRepo.getBills();
}

export async function getBillByIdUseCase(id: string): Promise<IBill> {
  const bill = await billsRepo.getBill(id);
  if (!bill) {
    throw new Error(`Bill with id ${id} not found`);
  }
  const items = await billItemsRepo.getBilledItemsByBillId(id);
  const itemsIds = items.map((item) => item.itemId);
  const itemsFromDb = await itemsRepo.getItems(itemsIds);

  const itemsWithNames = items.map((item) => {
    const fullItem = itemsFromDb.find((dbItem) => dbItem.id === item.itemId);
    return {
      id: item.itemId,
      quantity: item.quantity,
      name: fullItem!.name,
    };
  });

  return {
    ...bill,
    items: itemsWithNames.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      name: item.name,
    })),
  };
}
