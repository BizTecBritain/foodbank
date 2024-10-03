import mongoose, { Model, model, Schema } from "mongoose";

export interface AccountUserDocument {
  _id: Schema.Types.ObjectId;
  name: string;
  language: string;
  familySize: {
    adults: number;
    children: number;
  };
  address?: string;
  orders: Schema.Types.ObjectId[];
}

const AccountUserSchema = new Schema<AccountUserDocument>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  language: {
    type: String,
    required: true,
  },
  familySize: {
    adults: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
  },
  address: {
    type: String,
    required: false,
  },
  orders: {
    type: [Schema.Types.ObjectId],
    of: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    default: [],
    required: true,
  },
});

const AccountUserModel: Model<AccountUserDocument> =
  mongoose.models?.AccountUser ||
  model<AccountUserDocument>("AccountUser", AccountUserSchema);

export default AccountUserModel;
