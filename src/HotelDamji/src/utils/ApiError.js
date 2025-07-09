class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      stack: this.isOperational ? undefined : this.stack,
    };
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.toJSON());
  } else {
    console.error(err); 
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { ApiError, errorHandler };