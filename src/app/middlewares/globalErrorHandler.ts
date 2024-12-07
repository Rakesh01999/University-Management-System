import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../error/handleZodError';
import handleValidationError from '../error/handleValidationError';



// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  // setting default values 
  let statusCode = err.statusCode || 500; // Use provided status code or default to 500
  let message = err.message || "Something went wrong!";


  let errorSources: TErrorSources = [{
    path: '',
    message: 'Something went wrong',
  }];


  if (err instanceof ZodError) {

    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources

  } else if (err?.name === 'ValidationError') {
    // console.log('Mongoose er validation error ! ') ;
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  }


  // ultimate return 
  return res.status(statusCode).json({
    success: false,
    message,
    // error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack in development mode
    errorSources,
    // error: err,
    // err,
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