 
 
 
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

// const test = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

app.get('/', (req: Request, res: Response) => {
  res.send('Task Management System');
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(err, req, res, next); // Ensure globalErrorHandler is used as an error-handling middleware
});

// Not Found Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next); // Ensure notFound is used as a middleware function
});

export default app;
