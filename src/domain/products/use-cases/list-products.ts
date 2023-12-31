import type { ProductsDb } from '../models';

export default function makeListProducts({
  productsDb,
}: {
  productsDb: ProductsDb;
}) {
  return async function listProducts({
    limit,
    page,
    query,
    sort,
  }: {
    limit: number;
    page: number;
    query?: string;
    sort?: string;
  }) {
    return productsDb.findAll({ limit, sort });
  };
}
