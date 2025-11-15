import UserModel from "../Models/users.model.js";
import { verifyToken } from "../Utils/crypt.js";

export const authentication = (req, res, next) => {
  try {
    let token = req?.headers.authorization.split(" ")[1];
    // console.log(token);
    let tokenIsValid = verifyToken(token);
    if (tokenIsValid) {
      req.userId = tokenIsValid.userId;
      next();
    }
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    let userId = req.userId;
    let userData = await UserModel.findOne({ _id: userId });
    if (userData?.role === "ADMIN") {
      next();
    } else {
      res.status(401).json({
        success: false,
        msg: "Unauthorized User!",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
