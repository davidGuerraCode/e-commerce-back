import type { ProductDb } from '../../../types';

export default function makeListProducts({
  productDb,
}: {
  productDb: ProductDb[];
}) {
  return async function findAll({ limit }: { limit: number }) {
    if (limit) {
      return productDb.slice(0, limit);
    }

    return productDb;
  };
}
