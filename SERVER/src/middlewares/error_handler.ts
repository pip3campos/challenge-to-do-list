import { ErrorRequestHandler } from "express";
import { isHttpError } from 'http-errors'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(`PATH: ${req.path}`, error);
    let errorMessage = "An unknown error occured";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
}
export default ErrorHandler;