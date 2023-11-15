import express, { Router } from "express";
import UserAuth from "./user.controller";

const router: Router = express.Router();
const user = new UserAuth();

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/user/:id", user.user);
router.get("/users", user.users);
router.put("/update-user/:id", user.update);

export default router;
