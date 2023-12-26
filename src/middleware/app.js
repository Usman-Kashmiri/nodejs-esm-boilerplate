import ErrorHandler from "../utils/ErrorHandler";

export const routeNotFoundHandler = (req, res, next) => {
  return ErrorHandler(
    `The Requested Route ${req.hostname + req.originalUrl} Not Found`,
    404,
    req,
    res
  );
};
