import type { Request, Response } from "express";
import PlantModel from "../models/plants";
import httpStatusCodes from "../utils/httpStatusCode";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Plant = Record<string, any>;

async function getAll(req: Request, res: Response) {
	try {
		const plants = await PlantModel.find();
		return res.status(httpStatusCodes.OK).json(plants);
	} catch (err) {
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error fetching plants");
	}
}

async function addProduct(req: Request, res: Response) {
	try {
		const productData = req.body;
		const createdProduct = await PlantModel.create(productData);
		return res.status(httpStatusCodes.OK).json(createdProduct);
	} catch (err) {
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error creating product");
	}
}

async function deleteProduct(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const productToDelete = await PlantModel.findById(id);

		if (!productToDelete) {
			return res.status(httpStatusCodes.NOT_FOUND).send("Product not found");
		}

		await productToDelete.deleteOne();

		return res.status(httpStatusCodes.OK).send("Product deleted successfully");
	} catch (err) {
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error deleting product");
	}
}

async function updateProduct(req: Request, res: Response) {
	const { id } = req.params;
	const updateData = req.body;

	try {
		const plantToUpdate = (await PlantModel.findById(id)) as Plant;

		if (!plantToUpdate) {
			return res.status(httpStatusCodes.NOT_FOUND).send("Product not found");
		}

		for (const key of Object.keys(updateData)) {
			if (Object.prototype.hasOwnProperty.call(updateData, key)) {
				plantToUpdate[key] = updateData[key];
			}
		}

		await plantToUpdate.save();

		return res.status(httpStatusCodes.OK).json(plantToUpdate);
	} catch (err) {
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error updating product");
	}
}

export { addProduct, deleteProduct, getAll, updateProduct };
