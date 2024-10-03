import mongoose, { Model, model, Schema } from "mongoose";

export interface AccountUserDocument {
  _id: Schema.Types.ObjectId;
  password: string;
  name: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountUser {
  _id: string;
  name: string;
  admin: boolean;
}

const AccountUserSchema = new Schema<AccountUserDocument>(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const AccountUserModel: Model<AccountUserDocument> =
  mongoose.models?.AccountUser ||
  model<AccountUserDocument>("AccountUser", AccountUserSchema);

export default AccountUserModel;
