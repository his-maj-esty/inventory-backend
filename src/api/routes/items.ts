import { Router } from "express";
import {
  createItemUseCase,
  createItemsUseCase,
  getAllItemsUseCase,
} from "../../application/use-cases/items";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const item = await createItemUseCase(req.body);
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const items = await createItemsUseCase(req.body);
    res.status(201).json(items);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await getAllItemsUseCase();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const items = await getAllItemsUseCase();
//     res.status(200).json(items);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;
