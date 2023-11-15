import { randomUUID } from 'crypto';
import type { Cart, CartDb } from '../../../types';

export function makeListCarts({ cartDb }: { cartDb: CartDb[] }) {
  return async function findAll({ limit }: { limit: number }) {
    if (limit) {
      return cartDb.slice(0, limit);
    }

    return cartDb;
  };
}

export function makeListCart({ cartDb }: { cartDb: CartDb[] }) {
  return async function findById({ cartId }: { cartId: string }) {
    const result = cartDb.find(cart => cart.id === cartId);

    return result ? result : null;
  };
}

export function makeAddCart({ cartDb }: { cartDb: CartDb[] }) {
  return async function add(cart: Cart) {
    const newCart = {
      ...cart,
      id: randomUUID(),
    };

    cartDb.push(newCart);

    return newCart;
  };
}

export function makeAddToCart({ cartDb }: { cartDb: CartDb[] }) {
  return async function addToCart({
    cartId,
    productId,
    changes,
  }: {
    cartId: string;
    productId: string;
    changes: Cart;
  }) {
    const currentCartIdx = cartDb.findIndex(cart => cart.id === cartId);
    const currentCart = cartDb[currentCartIdx];

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
  };
}

export function makeDeleteCart({ cartDb }: { cartDb: CartDb[] }) {
  return async function remove({ cartId }: { cartId: string }) {
    const cartIndex = cartDb.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) return null;

    const deletedCart = cartDb.splice(cartIndex, 1);

    return deletedCart;
  };
}
