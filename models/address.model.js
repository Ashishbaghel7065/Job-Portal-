import mongoose from "mongoose";

const { Schema } = mongoose;

// Address schema
const AddressSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    pincode: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Export the Address model
const AddressModel = mongoose.model("Address", AddressSchema);
export default AddressModel;
