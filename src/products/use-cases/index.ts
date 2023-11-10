import { loadJSONFromFile } from '../../libs/read-json';
import type { ProductDb } from '../../types';
import makeAddProduct from './add-product';
import makeListProduct from './list-product';
import makeListProducts from './list-products';
import makeRemoveProduct from './remove-product';
import makeUpdateProduct from './update-product';

const productDb: ProductDb[] = loadJSONFromFile('./products.json');
export type ProductList = typeof productDb;

const addProduct = makeAddProduct({ productDb });
const updateProduct = makeUpdateProduct({ productDb });
const listProducts = makeListProducts({ productDb });
const listProduct = makeListProduct({ productDb });
const deleteProduct = makeRemoveProduct({ productDb });

const productService = Object.freeze({
  addProduct,
  updateProduct,
  listProducts,
  listProduct,
  deleteProduct,
});

export type ListProducts = typeof listProducts;
export type ListProduct = typeof listProduct;
export type AddProduct = typeof addProduct;
export type UpdateProduct = typeof updateProduct;
export type RemoveProduct = typeof deleteProduct;

export default productService;
export { addProduct, deleteProduct, listProduct, listProducts, updateProduct };
