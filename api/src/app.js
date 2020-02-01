import 'core-js/stable';
import 'regenerator-runtime/runtime';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './configs/swagger';
import allRoutes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

allRoutes(app);

export default app;
