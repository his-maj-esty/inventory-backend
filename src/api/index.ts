import billsRouter from "./routes/bills";
import itemsRouter from "./routes/items";
import { Express } from "express";
var express = require("express");

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/bills", billsRouter);
app.use("/api/items", itemsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
