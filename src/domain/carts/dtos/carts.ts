import { cartSchema } from '../../../schemas/carts';
import type { Cart } from '../../../types';

export default function makeCart(cart: Cart) {
  const validCart = validate(cart);

  return Object.freeze(validCart);

  function validate(cart: Cart) {
    const validatedCart = cartSchema.safeParse(cart);

    if (!validatedCart.success) {
      throw new Error(validatedCart.error.message);
    }

    return validatedCart.data;
  }
}
