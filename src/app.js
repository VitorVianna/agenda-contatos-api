import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import swaggerUi from 'swagger-ui-express';
import openapiSpec from './docs/openapi.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, {
  swaggerOptions: { persistAuthorization: true }
}));
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // For dev/demo. In production, use migrations.
    console.log('Connected to MySQL and synced models.');
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}/api`));
  } catch (err) {
    console.error('Failed to start the server:', err);
    process.exit(1);
  }
}

start();
