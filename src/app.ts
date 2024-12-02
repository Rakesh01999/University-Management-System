import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// Application routes
// app.use('/api/v1/students', StudentRoutes);
// app.use('/api/v1/users', UserRoutes);
app.use('/api/v1', router);

// Controller for root route
const test = (req: Request, res: Response) => {
  res.status(200).send("Success"); // HTTP 200 OK with a message
};
app.get('/', test);

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
