import mongoose, { Model, model, Schema } from "mongoose";

export interface FoodDocument {
  _id: Schema.Types.ObjectId;
  name: string;
  image: Buffer;
  type: "Food" | "Toiletries";
  translatedNames: { [key: string]: string };
  isAvailable: boolean;
  availableNumber: number;
}

const FoodSchema = new Schema<FoodDocument>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: Buffer,
    default: false,
  },
  type: {
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
