import mongoose, { Model, model, Schema } from "mongoose";

export interface ConfigDocument {
  _id: Schema.Types.ObjectId;
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
