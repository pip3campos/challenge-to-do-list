import "dotenv/config";
import './config/database'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger'
import indexRouter from './routes/index';

import ErrorHandler from './middlewares/error_handler';
import Not_Found from './middlewares/not_found';

const app = express();
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.1/swagger-ui.min.css";
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCssUrl: CSS_URL }))
app.use(Not_Found)
app.use(ErrorHandler)

export default app;
