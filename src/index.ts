import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import productRouter from './products/routes/productRouter';
/* import { cartsController } from './cart/controllers/carts.controller';
import upload from './products/adapters/image-uploader.adapter'; */
// import { productsController } from './products/controllers/products.controller';

dotenv.config();

const port = process.env.PORT ?? 8080;
const app = express();
const apiRoot = process.env.API_BASE_URL ?? '/api';

app.disable('x-powered-by');

app.use(express.json());
app.use(logger('dev'));

/* app.all(`${apiRoot}/products`, upload.single('thumbnail'), productsController);
app.all(`${apiRoot}/products/:pid`, productsController);
app.all(`${apiRoot}/carts`, cartsController);
app.get(`${apiRoot}/carts/:cid`, cartsController);
app.all(`${apiRoot}/carts/:cid/product/:pid`, cartsController); */
app.use(`${apiRoot}/products`, productRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found!' });
});

app.listen(port, () => console.log(`[+] Server is running on port ${port}`));
