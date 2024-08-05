import { Router } from "express";
import authUser from "../controllers/authController";
import {
	addProduct,
	deleteProduct,
	getAll,
	updateProduct,
} from "../controllers/plantsController";
import authenticateToken from "../middlewares/authToken";

const router = Router();

router.post("/login", authUser);
router.post("/product", authenticateToken, addProduct);
router.put("/product/:id", authenticateToken, updateProduct);
router.delete("/product/:id", authenticateToken, deleteProduct);
router.get("/plants", getAll);

export default router;
