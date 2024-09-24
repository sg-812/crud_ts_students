// or global usage functionalities, utility file is made
import  { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import multer from "multer";
import path from "path";

// image upload
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
export const uploadUser = multer({
  storage: fileStorage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"||
       file.mimetype == "image/webp"
    ) {
      callback(null, true);
    } else {
      console.log("selete valid image format");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});

//-------------------------------------------------------------------------------------------

// hash password generate
export const hashPassword = async (password:string) => {
  try {
    const saltPassword = 12;
    const hashedPassword = await bcrypt.hash(password, saltPassword);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
//password comparison
export const comparePassword = async (password:string, hashedPassword:string) => {
  return bcrypt.compare(password, hashedPassword);
};

//---------------------------------------------------------------------------------------------

//transporter for email send

export const createTransporter = (senderEmail:string, senderPassword:string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp",
    port: 465,
    secure: false,
    requireTLS: true,
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });
  return transporter;
};

//---------------------------------------------------------------------------------------------

// jwt token verification at the time of login
export const authCheck = async (req: Request | any, res: Response, next:Function) => {
  const token =    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      status: "false",
      message: "a token is required ",
    });
  }
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({
      status: false,
      message: "invalid token",
    });
  }
  return next();
};


