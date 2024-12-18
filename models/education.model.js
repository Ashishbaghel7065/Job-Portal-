import mongoose from "mongoose";

const { Schema } = mongoose;

// Education schema
const EducationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  degree: {
    type: String,
    default: "",
  },
  institution: {
    type: String,
    default: "",
  },
  yearOfPassing: {
    type: Number,
    default: "",
  },
});

// Export the Education model
const EducationModel = mongoose.model("Education", EducationSchema);
export default EducationModel;
