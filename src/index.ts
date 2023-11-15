import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import cartRouter from './routes/cartRouter';
import productRouter from './routes/productRouter';

dotenv.config();

const port = process.env.PORT ?? 8080;
const app = express();
const apiRoot = process.env.API_BASE_URL ?? '/api';

app.disable('x-powered-by');

app.use(express.json());
app.use(logger('dev'));

app.use(`${apiRoot}/products`, productRouter);
app.use(`${apiRoot}/carts`, cartRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found!' });
});

app.listen(port, () => console.log(`[+] Server is running on port ${port}`));
