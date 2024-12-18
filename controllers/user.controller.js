import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import EducationModel from "../models/education.model.js";
import AddressModel from "../models/Address.model.js";

export const userRegister = async (req, res) => {
  const { fullName, email, password, phone, role } = req.body;

  try {
    if (!fullName || !email || !password || !phone || !role) {
      return res.status(400).json({
        message:
          "Missing required fields: fullName, email, password ,role, or phone. ",
        success: false,
        error: true,
      });
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        message: "User already registered. Please login!",
        success: false,
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
      phone,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
      error: false,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        phone: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      success: false,
      error: true,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required.",
        success: false,
      });
    }

    const existUser = await userModel.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        message: "User not found. Please register first.",
        success: false,
      });
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      existUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
    }

    const payload = {
      userId: existUser._id,
      userEmail: existUser.email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "User logged in successfully.",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error. Please try again later.",
      success: false,
      error: error.message,
    });
  }
};


export const jobSeekerUpdate = async (req, res) => {
  const userId = req.user?.userId; // Ensure userId is properly extracted

  try {
    // Destructure required fields
    const {
      fullName,
      password,
      phone,
      skill,
      profile = {},
    } = req.body;

    const { Address = {}, education = {} } = profile;
    const { street, area, city, pincode, state, country } = Address;
    const { degree, institution, yearOfPassing } = education;

    // Centralized validation
    if (!fullName || !phone || !skill) {
      return res.status(400).json({
        message: "Missing required user details (fullName, phone, skill).",
        success: false,
      });
    }

    if (Address && (!street || !area || !city || !pincode || !state || !country)) {
      return res.status(400).json({
        message: "Missing required Address details (street, area, city, pincode, state, country).",
        success: false,
      });
    }

    if (education && (!degree || !institution || !yearOfPassing)) {
      return res.status(400).json({
        message: "Missing required education details.",
        success: false,
      });
    }

    // Find the existing user
    const existUser = await userModel.findById(userId);
    if (!existUser) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Hash password only if provided
    let hashPassword = existUser.password; // Retain the old password if not updating
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    // Update user details
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { fullName, phone, skill, password: hashPassword },
      { new: true }
    );

    let updateAddress = null;
    if (Address) {
      if (existUser.profile?.Address) {
        updateAddress = await AddressModel.findByIdAndUpdate(
          existUser.profile.Address,
          { state, pincode, country, area, street, city },
          { new: true }
        );
      } else {
        const newAddress = await AddressModel.create({
          userId,
          state,
          pincode,
          country,
          area,
          street,
          city,
        });
        existUser.profile = newAddress._id;
        await existUser.save();
        updateAddress = newAddress;
      }
    }


    let updateEducation = null;
    if (education) {
      if (existUser.profile?.education) {
        updateEducation = await EducationModel.findByIdAndUpdate(
          existUser.profile.education,
          { degree, institution, yearOfPassing },
          { new: true }
        );
      } else {
        const newEducation = await EducationModel.create({
          userId,
          degree,
          institution,
          yearOfPassing,
        });
        existUser.profile = newEducation._id;
        await existUser.save();
        updateEducation = newEducation;
      }
    }

    res.status(200).json({
      message: "User updated successfully.",
      success: true,
      updateUser,
      updateAddress,
      updateEducation,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};


