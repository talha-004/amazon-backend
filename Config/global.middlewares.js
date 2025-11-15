import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

export const applyMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
};
