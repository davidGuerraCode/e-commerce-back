import { type ProductDb } from './../../types/index';
export default function makeRemoveProduct({
  productDb,
}: {
  productDb: ProductDb[];
}) {
  return async function remove({ productId }: { productId: string }) {
    const productIdx = productDb.findIndex(product => product.id === productId);

    if (productIdx === -1) return false;

    productDb.splice(productIdx, 1);

    return true;
  };
}
