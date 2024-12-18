import express from "express";
import { jobSeekerUpdate, userLogin, userRegister,  } from "../controllers/user.controller.js";
import Auth from "../middleware/auth.js";


const router = express.Router();

router.post("/user/signup",userRegister);
router.post("/user/login",userLogin);
router.patch("/user/update-details",Auth,jobSeekerUpdate);
export default router;
