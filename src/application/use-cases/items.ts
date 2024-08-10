import { create } from "domain";
import { ItemInsertInput, ItemInsertResult } from "../../entities/modals/item";
import { ItemsRepository } from "../../infrastructure/repositories/items";

const itemsRepo = new ItemsRepository();

export async function createItemUseCase(
  item: ItemInsertInput
): Promise<ItemInsertResult> {
  return await itemsRepo.createItem(item);
}

export async function createItemsUseCase(
  items: ItemInsertInput[]
): Promise<ItemInsertResult[]> {
  return await itemsRepo.createItems(items);
}

export async function getAllItemsUseCase() {
  return await itemsRepo.getAllItems();
}
