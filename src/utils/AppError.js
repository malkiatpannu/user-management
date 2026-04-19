class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.status = statusCode;
        this.statusCode = statusCode;

        // classify error type
        this.isOperational = true;

        // clean stack trace (removes constructor call)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;