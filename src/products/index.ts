import { loadJSONFromFile } from '../libs/read-json';
import type { ProductDb } from '../types';
import makeProductList from './models/product-list.model';
import makeProductsEndpointHandler from './use-cases/products-endpoint';

const productDb: ProductDb[] = loadJSONFromFile('./products.json');
const productList = makeProductList({ database: productDb });
export type ProductList = typeof productList;
const productsEndpointHandler = makeProductsEndpointHandler({ productList });

export default productsEndpointHandler;
