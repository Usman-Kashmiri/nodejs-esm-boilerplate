const logger = require("../functions/logger");
const ErrorHandler = (message, statusCode, req, res) => {
  logger.error({
    origin: req.headers["origin"],
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    date: new Date(),
    message: message,
  });
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = ErrorHandler;
