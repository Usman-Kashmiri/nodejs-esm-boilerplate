const SuccessHandler = (message, data = null, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default SuccessHandler;
