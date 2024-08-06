import { Router } from "express";
import authUser from "../controllers/authController";
import {
	addPlanting,
	deletePlating,
	getAllPlanting,
	updatePlanting,
} from "../controllers/plantsController";
import authenticateToken from "../middlewares/authToken";

const router = Router();

router.post("/login", authUser);
router.get("/plants", authenticateToken, getAllPlanting);
router.post("/plants", authenticateToken, addPlanting);
router.put("/plants/:id", authenticateToken, updatePlanting);
router.delete("/plants/:id", authenticateToken, deletePlating);

export default router;
