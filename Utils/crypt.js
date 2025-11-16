import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../Config/env.config.js";

export const hashPwt = (plainTxt, salt = 2) => {
  return bcrypt.hash(plainTxt, salt);
};

export const comparePwt = (plainTxt, hashPwt) => {
  return bcrypt.compare(plainTxt, hashPwt);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_KEY, { expiresIn: 600 });
};

export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_KEY);
};
