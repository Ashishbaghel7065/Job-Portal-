import mongoose from "mongoose";

const { Schema } = mongoose;

const CompanySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    website: {
      type: String,
      trim: true,
    },
    industryType: {
      type: String,
      default: "Other",
    },
    numberOfEmployees: {
      type: Number,
      min: 1,
      default: 1,
    },
    jobsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
export default Company;
