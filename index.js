import express from "express";
import apiRouter from "./Routers/indexRoute.js";
import { applyMiddleware } from "./config/global.middlewares.js";
import { env } from "./Config/env.config.js";
import { dbConnect } from "./Config/db.connect.js";
import { appErrorHandler } from "./Middlewares/errorHandler.js";

const app = express();

//Global Middlewares (cors,json,cookie parser, url encoded)
applyMiddleware(app);

app.use("/api/v1", apiRouter);

// error middleware (added at last becasue error come after all routes exucation)
app.use(appErrorHandler);

const PORT = env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`⭐ Server is running on PORT: ${PORT}`);
  dbConnect();
});
