import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';



// const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  // setting default values 
  let statusCode = err.statusCode || 500; // Use provided status code or default to 500
  let message = err.message || "Something went wrong!";

  type TErrorSource = {
    path: string | number;
    message: string;
  }[]

  const errorSources = [{
    path: '',
    message: 'Something went wrong',
  }];


  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'ami zod error';
  }


  // ultimate return 
  return res.status(statusCode).json({
    success: false,
    message,
    // error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack in development mode
    errorSources,
    error: err,
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