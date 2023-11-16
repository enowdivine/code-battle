import express, { Router } from "express";
import Flood from "./flood.controller";

const router: Router = express.Router();
const flood = new Flood();

router.post("/add-data", flood.addData);
router.get("/data", flood.floodData);

export default router;
