import { loadJSONFromFile } from '../../../libs/read-json';
import type { CartDb } from '../../../types';
import {
  makeAddCart,
  makeAddToCart,
  makeDeleteCart,
  makeListCart,
  makeListCarts,
} from './carts.use-case';

const cartDb: CartDb[] = loadJSONFromFile('./carts.json');

const addCart = makeAddCart({ cartDb });
const updateCart = makeAddToCart({ cartDb });
const listCarts = makeListCarts({ cartDb });
const listCart = makeListCart({ cartDb });
const deleteCart = makeDeleteCart({ cartDb });

const cartModel = Object.freeze({
  addCart,
  updateCart,
  listCarts,
  listCart,
  deleteCart,
});

export type AddCart = typeof addCart;
export type UpdateCart = typeof updateCart;
export type ListCarts = typeof listCarts;
export type ListCart = typeof listCart;
export type RemoveCart = typeof deleteCart;

export default cartModel;
export { addCart, deleteCart, listCart, listCarts, updateCart };
