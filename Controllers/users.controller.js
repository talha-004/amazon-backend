import UserModel from "../Models/users.model.js";
import { comparePwt, generateToken, hashPwt } from "../Utils/crypt.js";

export const getAllUsers = async (req, res, next) => {
  try {
    let allUser = await UserModel.find();
    res.status(200).json({
      success: true,
      message: "Fetch Data Successfully!",
      data: allUser,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, termAndConditions } = req.body;
    const hashPassword = await hashPwt(password, 10);

    const registerUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
      role,
      termAndConditions,
    });

    res.status(200).json({
      success: true,
      message: "User registered Successfully!",
      data: registerUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // if user email is not exit
    if (!user) {
      const error = new Error("Invalid Credentials!");
      error.statusCode = 401;
      return next(error);
    }

    // validate password
    const isPasswordCorrect = await comparePwt(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error("Invalid Credentials!");
      error.statusCode = 401;
      return next(error);
    }

    // if both email adn password is correct
    const token = generateToken({ userId: user._id });
    return res.status(200).json({
      success: true,
      message: "Login Successfully!",
      data: {
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   success: false,
    //   message: "Internal server error",
    //   err: error.message,
    // });
  }
};
