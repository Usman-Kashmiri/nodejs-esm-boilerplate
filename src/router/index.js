import RouteNotFoundHandler from "../middleware/app.js";
import auth from "./auth.js";
import express from "express";

const router = express.Router();

router.use("/auth", auth);

// ? app
router.use(RouteNotFoundHandler);

export default router;
