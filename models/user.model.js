import mongoose from "mongoose";

const { Schema } = mongoose;

// User Schema for Job Portal App
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
      type: String,
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    role: {
      type: String,
      enum: ["Admin", "Recruiter", "JobSeeker"],
      default: "JobSeeker",
    },
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", 
      },
    ],
    companyDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", 
    },
    postedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
