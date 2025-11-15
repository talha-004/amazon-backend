export const appErrorHandler = (err, req, res, next) => {
  //   i can add logging here
  //logging

  console.log(err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
