import { ErrorRequestHandler } from "express";
import { isHttpError } from 'http-errors'

const ErrorHandler: ErrorRequestHandler = (error, req, res) => {
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