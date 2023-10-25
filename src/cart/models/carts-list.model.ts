import { randomUUID } from 'node:crypto';
import type { Cart, CartDb } from '../../types';

export default function makeCartList({ database }: { database: CartDb[] }) {
  return Object.freeze({
    add,
    findById,
    findAll,
    addToCart,
  });

  async function findAll({ limit }: { limit: number }) {
    if (limit) {
      return database.slice(0, limit);
    }

    return database;
  }

  async function findById({ cartId }: { cartId: string }) {
    const result = database.find(cart => cart.id === cartId);

    return result ? result : null;
  }

  async function add(cart: Cart) {
    const newCart = {
      ...cart,
      id: randomUUID(),
    };

    database.push(newCart);

    return newCart;
  }

  async function addToCart({
    cartId,
    productId,
    changes,
  }: {
    cartId: string;
    productId: string;
    changes: Cart;
  }) {
    const currentCartIdx = database.findIndex(cart => cart.id === cartId);
    const currentCart = database[currentCartIdx];

    if (!productId || !currentCart || currentCartIdx === -1) return null;

    const productAlreadyInCartIdx = currentCart.products.findIndex(
      product => product.productId === productId
    );

    if (productAlreadyInCartIdx === -1) return null;

    const currentProductInCart = currentCart.products[productAlreadyInCartIdx];

    if (!currentProductInCart) {
      currentCart.products = changes.products;
    } else {
      currentProductInCart.quantity += 1;
    }

    return currentCart;
  }
}
