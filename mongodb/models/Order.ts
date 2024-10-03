import mongoose, { Model, model, Schema } from "mongoose";

export interface OrderDocument {
  _id: Schema.Types.ObjectId;
  number: number;
  user: Schema.Types.ObjectId;
  food: Schema.Types.ObjectId[];
  toiletries: Schema.Types.ObjectId[];
  extraNotes: string;
  isPriority: boolean;
  status: "Pending" | "Fulfilling Food" | "Fulfilling Toiletries" | "Complete";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    number: {
      type: Number,
      required: [true, "Number is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    food: {
      type: [Schema.Types.ObjectId],
      of: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      default: [],
      required: true,
    },
    toiletries: {
      type: [Schema.Types.ObjectId],
      of: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      default: [],
      required: true,
    },
    extraNotes: {
      type: String,
      default: "",
      required: true,
    },
    isPriority: {
      type: Boolean,
      default: false,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Fulfilling Food", "Fulfilling Toiletries", "Complete"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel: Model<OrderDocument> =
  mongoose.models?.Order || model<OrderDocument>("Order", OrderSchema);

export default OrderModel;
