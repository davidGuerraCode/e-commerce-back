import type { ProductDb } from '../../types';

export default function makeListProduct({
  productDb,
}: {
  productDb: ProductDb[];
}) {
  return async function findById({ productId }: { productId: string }) {
    const result = productDb.find(product => product.id === productId);

    return result ? result : null;
  };
}
