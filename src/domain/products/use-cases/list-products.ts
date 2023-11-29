import type { ProductsDb } from '../models';

export default function makeListProducts({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function listProducts({ limit }: { limit: number }) {
    return productsDb.findAll({ limit });
  };
}
