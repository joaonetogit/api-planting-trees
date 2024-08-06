import type { Request, Response } from "express";
import PlantModel from "../models/plants";
import type { TypePlantToLoadResponse } from "../types/plant";
import httpStatusCodes from "../utils/httpStatusCode";

async function getAllPlanting(req: Request, res: Response) {
	try {
		const plants = await PlantModel.find();
		return res.status(httpStatusCodes.OK).json(plants);
	} catch (err) {
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error fetching plants");
	}
}

async function addPlanting(req: Request, res: Response) {
	try {
		const { cradle } = req.body;

		const existingPlanting = await PlantModel.findOne({ cradle });
		if (existingPlanting) {
			return res
				.status(httpStatusCodes.BAD_REQUEST)
				.json({ message: "A planting with this cradle already exists." });
		}

		const createdPlanting = await PlantModel.create(req.body);
		return res.status(httpStatusCodes.CREATED).json(createdPlanting);
	} catch (err) {
		console.error(err);
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error creating Planting");
	}
}

async function deletePlating(req: Request, res: Response) {
	const { id } = req.params;

	try {
		const PlatingToDelete = await PlantModel.findById(id);

		if (!PlatingToDelete) {
			return res.status(httpStatusCodes.NOT_FOUND).send("Plating not found");
		}

		await PlatingToDelete.deleteOne();

		return res.status(httpStatusCodes.OK).send("Plating deleted successfully");
	} catch (err) {
		return res
			.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
			.send("Error deleting Plating");
	}
}

async function updatePlanting(req: Request, res: Response) {
	const { id } = req.params;
	const updateData = req.body;

	try {
		const plantToUpdate = (await PlantModel.findById(
			id,
		)) as TypePlantToLoadResponse;

		if (!plantToUpdate) {
			return res.status(httpStatusCodes.NOT_FOUND).send("Planting not found");
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
			.send("Error updating Planting");
	}
}

export { addPlanting, deletePlating, getAllPlanting, updatePlanting };
