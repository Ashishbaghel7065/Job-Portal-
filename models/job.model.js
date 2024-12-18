import mongoose from "mongoose";

const { Schema } = mongoose;

const JobSchema = new Schema(
  {

    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true, 
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    postedDate: {
      type: Date,
      default: Date.now, 
    },
    salary: {
      type: String,
      required: true,
    },
    noOfApplicants: {
      type: Number, 
      default: 0,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"], 
      required: true,
    },
  },
  { timestamps: true } 
);

// Exporting Job Model
const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;
