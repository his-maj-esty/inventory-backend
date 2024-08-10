import { Router } from "express";
import {
  createBillUseCase,
  getAllBillsUseCase,
  getBillByIdUseCase,
} from "../../application/use-cases/bills";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const billId = await createBillUseCase(req.body);
    res.status(201).json({ billId });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const bills = await getAllBillsUseCase();
    res.status(200).json(bills);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bill = await getBillByIdUseCase(req.params.id);
    res.status(200).json(bill);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
