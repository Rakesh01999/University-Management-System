import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';



// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  // setting default values 
  let statusCode = err.statusCode || 500; // Use provided status code or default to 500
  let message = err.message || "Something went wrong!";


  let errorSources: TErrorSource = [{
    path: '',
    message: 'Something went wrong',
  }];

  const handleZodError = (err: ZodError) => {

    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      }
    })
    const statusCode = 400;
    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    }

  }

  if (err instanceof ZodError) {

    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources

  }


  // ultimate return 
  return res.status(statusCode).json({
    success: false,
    message,
    // error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack in development mode
    errorSources,
    // error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};





export default globalErrorHandler;


// pattern
/*
  success
  message
  errorSources: [
    path: '',
    message: ''  
  ]

  stack
 */