import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import { cartsController } from './cart/controllers/carts.controller';
import { productsController } from './products/controllers/products.controller';

dotenv.config();

const port = process.env.PORT ?? 8080;
const app = express();
const apiRoot = process.env.API_BASE_URL ?? '/api';

app.disable('x-powered-by');

app.use(express.json());
app.use(logger('dev'));

app.all(`${apiRoot}/products`, productsController);
app.all(`${apiRoot}/products/:pid`, productsController);
app.all(`${apiRoot}/carts`, cartsController);
app.get(`${apiRoot}/carts/:cid`, cartsController);
app.all(`${apiRoot}/carts/:cid/product/:pid`, cartsController);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found!' });
});

app.listen(port, () => console.log(`[+] Server is running on port ${port}`));
