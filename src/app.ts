/* eslint-disable no-undef */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import * as path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Trust the first proxy
app.set('trust proxy', true);

// Set the path to the views directory
app.set('views', path.join(__dirname, '../views'))

// application routes
app.use('/', router);

// Dev route
app.get('/dev', async (req: Request, res: Response) => {
          res.render('dev');
})

// Docs route
app.get('/docs', async (req: Request, res: Response) => {
          res.render('docs');
})

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;