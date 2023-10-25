import { productSchema } from '../../schemas/product';
import type { Product } from '../../types';

export default function makeProduct(product: Product) {
  const validProduct = validate(product);

  return Object.freeze(validProduct);

  function validate(product: Product) {
    const validatedProduct = productSchema.safeParse(product);

    if (!validatedProduct.success) {
      throw new Error(validatedProduct.error.message);
    }

    return validatedProduct.data;
  }
}
