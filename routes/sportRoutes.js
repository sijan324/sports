import express from "express";
import { addSport, getSports } from "../controllers/sportController.js";
const router = express.Router();

router.post("/add", addSport);
router.get("/", getSports);

export default router;
