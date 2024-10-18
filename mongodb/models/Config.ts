import mongoose, { Model, model, Schema, Types } from "mongoose";

export interface ConfigDocument {
  _id: Types.ObjectId;
  numAllowedItems: number;
  stockLimitsEnabled: boolean;
}

const ConfigSchema = new Schema<ConfigDocument>({
  numAllowedItems: {
    type: Number,
    required: true,
  },
  stockLimitsEnabled: {
    type: Boolean,
    default: false,
  },
});

const ConfigModel: Model<ConfigDocument> =
  mongoose.models?.Config || model<ConfigDocument>("Config", ConfigSchema);

export default ConfigModel;
