import express from "express";
import {authController} from "../../modules/users/controllers/Auth.controller";
const router = express.Router();
import {uploadUser} from '../../helper/utils'

router.post("/auth/register",  uploadUser.single("profile_image"),authController.register)


export default router;
