import mongoose, { Model, model, Schema, Types } from "mongoose";

export interface FoodDocument {
  _id: Types.ObjectId;
  name: string;
  image: string;
  foodType: "Food" | "Toiletries";
  translatedNames: Types.Map<string>;
  isAvailable: boolean;
  availableNumber: number;
}

const FoodSchema = new Schema<FoodDocument>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    enum: ["Food", "Toiletries"],
    required: true,
  },
  translatedNames: {
    type: Map,
    default: {},
    of: { type: String },
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  availableNumber: {
    type: Number,
    default: 0,
    required: true,
  },
});

const FoodModel: Model<FoodDocument> =
  mongoose.models?.Food || model<FoodDocument>("Food", FoodSchema);

export default FoodModel;
