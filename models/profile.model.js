import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address", 
    },
    education: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education", 
      },
    ],
    jobsApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", 
      },
    ],
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("Profile", profileSchema);
export default ProfileModel;
