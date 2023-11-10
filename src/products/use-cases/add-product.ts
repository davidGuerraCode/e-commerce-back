import { randomUUID } from 'node:crypto';
import { type Product, type ProductDb } from './../../types/index';

export default function makeAddProduct({
  productDb,
}: {
  productDb: ProductDb[];
}) {
  return async function addProduct({ productData }: { productData: Product }) {
    const newProduct = {
      ...productData,
      id: randomUUID(),
    };

    productDb.push(newProduct);

    return newProduct;
  };
}
