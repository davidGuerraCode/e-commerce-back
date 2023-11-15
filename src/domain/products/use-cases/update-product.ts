import { type Product, type ProductDb } from '../../../types/index';
export default function makeUpdateProduct({
  productDb,
}: {
  productDb: ProductDb[];
}) {
  return async function updateProduct({
    productId,
    changes,
  }: {
    productId: string;
    changes: Product;
  }) {
    const productIdx = productDb.findIndex(product => product.id === productId);

    if (productIdx === -1) return null;

    const currentProduct = productDb[productIdx];

    if (!currentProduct) return null;

    const updatedProduct = {
      ...currentProduct,
      ...changes,
    };

    productDb[productIdx] = updatedProduct;

    return updatedProduct;
  };
}
