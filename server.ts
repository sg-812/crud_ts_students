import "dotenv/config";
import express from 'express';
const appServer=express();
import { config } from "./app/config/config.ts";
const PORT=process.env.PORT||1000;

import authApiRouter from './app/routes/api/auth.routes.ts';
import {connectDB} from "./app/config/database.js";

// parsing
appServer.use(express.urlencoded({extended:true}))

appServer.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  appServer.use(authApiRouter);
  (async () => {
    try {
      // Database connection
      await connectDB();

      appServer.listen(PORT);
      console.log(
        `${config.server.project_name} is running on ${
          global.BASE_URL && global.BASE_URL !== ""
            ? global.BASE_URL
            : `http://localhost:${PORT}`
        }`
      );
    } catch (error) {
      console.error(error);
    }
  })();