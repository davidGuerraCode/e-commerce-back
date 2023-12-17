import type { ProductsDb } from '../models';

export default function makeCountProducts({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function countProducts() {
    return productsDb.count();
  };
}
