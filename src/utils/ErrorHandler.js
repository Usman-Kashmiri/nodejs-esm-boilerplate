import logger from "../functions/logger.js";

export const ErrorHandler = (message, statusCode, req, res) => {
  logger.error({
    method: req.method,
    url: req.url,
    date: new Date(),
    message: message,
  });
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
