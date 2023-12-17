import productsDb from '../models';
import makeAddProduct from './add-product';
import makeCountProducts from './count-products';
import makeListProduct from './list-product';
import makeListProducts from './list-products';
import makeRemoveProduct from './remove-product';
import makeUpdateProduct from './update-product';

const listProducts = makeListProducts({ productsDb });
const addProduct = makeAddProduct({ productsDb });
const updateProduct = makeUpdateProduct({ productsDb });
const listProduct = makeListProduct({ productsDb });
const deleteProduct = makeRemoveProduct({ productsDb });
const countProducts = makeCountProducts({ productsDb });

const productService = Object.freeze({
  listProducts,
  addProduct,
  updateProduct,
  listProduct,
  deleteProduct,
  countProducts,
});

export type ListProducts = typeof listProducts;
export type ListProduct = typeof listProduct;
export type AddProduct = typeof addProduct;
export type UpdateProduct = typeof updateProduct;
export type RemoveProduct = typeof deleteProduct;
export type CountProducts = typeof countProducts;

export default productService;
export {
  addProduct,
  countProducts,
  deleteProduct,
  listProduct,
  listProducts,
  updateProduct,
};
