import jwt from "jsonwebtoken";
import User from "../models/User/User.js";
import dotenv from "dotenv";
import { ErrorHandler } from "../utils/ErrorHandler.js";

dotenv.config({ path: ".././src/config/config.env" });

// * authentication middlewares

// ? check if user has jwt
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return ErrorHandler("Unauthorized Request", 401, req, res);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ? check if the role is admin
export const adminAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }
    if (req.user.role === "admin" || req.user.role === "mod") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message:
          "You're not an admin. You don't have the permissions to access this route",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ? check if the role is user
export const userAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }
    if (req.user.role !== "user") {
      return res.status(401).json({
        success: false,
        message:
          "You're not a user. You don't have the permissions to access this route",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
