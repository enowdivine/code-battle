import express, { Router } from "express";
import Warning from "./warning.controller";

const router: Router = express.Router();
const warning = new Warning();

router.post("/alarm_system", warning.alarm_system);

export default router;
