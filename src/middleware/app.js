import { ErrorHandler } from "../utils/ErrorHandler.js";

// ? route not handler
const RouteNotFoundHandler = (req, res, next) => {
  return ErrorHandler(
    `The Requested Route ${req.hostname + req.originalUrl} Not Found`,
    404,
    req,
    res
  );
};

export default RouteNotFoundHandler;
