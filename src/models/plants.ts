import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const PlantSchema = new Schema({
	_id: { type: String, default: uuidv4(), required: true, immutable: true },
	createdAt: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	plant: {
		type: String,
		required: true,
	},
	cradle: {
		type: String,
		required: true,
	},
});

export default mongoose.model("PlantModel", PlantSchema);
