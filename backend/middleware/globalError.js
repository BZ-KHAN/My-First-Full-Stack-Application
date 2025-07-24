export const globalError = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handling Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new Error(message);
    return res.status(400).json({
      error: error.message,
    });
  }

  // Handling Mongoose Duplicate Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      error: `${field} must be unique`,
    });
  }

  //Handling Cast Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new Error(message);
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(err.statusCode || 500).json({
    error: error.message || "something went wrong",
  });
};
