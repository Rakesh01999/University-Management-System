import { Request, Response, NextFunction } from 'express';

// const globalErrorHandler = (err: any, res: Response, req: Request, next: NextFunction) => {
//     const statusCode = 500;
//     const message = err.message || "Something went wrong !";

//     return res.status(statusCode).json({
//         success: false,
//         message,
//         error: err,
//     })
// };


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500; // Use provided status code or default to 500
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack in development mode
  });
};



export default globalErrorHandler;