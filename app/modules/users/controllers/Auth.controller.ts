import { authRepo } from "../repositories/Auth.repository.js";
// import { IResponse } from "../../../helper/IResponse.js";
import { Request, Response } from "express";
import { hashPassword, createTransporter } from "../../../helper/utils.js";
import { authModel } from "../model/Auth.model.js";

class AuthController {

  /**
   * //@Method:register
   * //@Description:For registering any user
   */

  async register(req: Request | any, res: Response) {
    try {
      // console.log("Received value: ",req.body,req.file);
      const { email, password } = req.body;

      const existingUser = await authRepo.findUser({ email });
      console.log("Existing User", existingUser);

      // 409 status code is used to indicate a conflict with the current state of a resource
      if (existingUser) {
        return res.status(409).send({
          success: false,
          message: "already registered with this email",
          status: 409,
        });
      }
      //password hash
      const hashedPassword = await hashPassword(password);
      console.log("HashPassword", hashedPassword);

      const user = new authModel({
        email,
        password: hashedPassword,
      });
      if (req.file) {
        user.profile_image = req.file.path;
      }
      await authRepo.save(user);

      const senderEmail = `${process.env.SENDER_MAIL}`;
      const senderPassword = `${process.env.SENDER_PASSWORD}`;
      const transporter = createTransporter(senderEmail, senderPassword);

      const mailOptions = {
        from: senderEmail,
        to: user.email,
        subject: "Email Verification ",
        text:
          "Hello " +
          req.body.fname +
          ",\n\nYou have successfully submitted your data to be registered.Please verify your account by clicking the link: \n" +
          "http://" +
          req.headers.host +
          "/mail_confirmation/" +
          req.body.email +
          "/" +
          "\n\nThank You!\n",
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error to send mail:", error);
          res.status(500).send({
            status: 500,
            success:false,
            message: "Technical Issue",
            error: error,
          });
        } else {
          console.log("Email sent: ", info.response);
          res.status(200).send({
            status: 200,
            message:"A verification Email has been send to your mail, please click the link to verify or else it will get expire in 24hrs",
            success:true
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error in registration",
        error: error.message,
      });
    }
  }
}

export const authController = new AuthController();
