import { randomUUID } from 'node:crypto';
import type { Product, ProductDb } from '../../types';

export default function makeProductList({
  database,
}: {
  database: ProductDb[];
}) {
  return Object.freeze({
    add,
    remove,
    findById,
    findAll,
    update,
  });

  async function findAll({ limit }: { limit: number }) {
    if (limit) {
      return database.slice(0, limit);
    }

    return database;
  }

  async function findById({ productId }: { productId: string }) {
    const result = database.find(product => product.id === productId);

    return result ? result : null;
  }

  async function add(productInfo: Product) {
    const product = {
      ...productInfo,
      id: randomUUID(),
    };

    database.push(product);

    return product;
  }

  async function remove({ productId }: { productId: string }) {
    const productIdx = database.findIndex(product => product.id === productId);

    if (productIdx === -1) return false;

    database.splice(productIdx, 1);

    return true;
  }

  async function update({
    productId,
    changes,
  }: {
    productId: string;
    changes: Product;
  }) {
    const productIdx = database.findIndex(product => product.id === productId);

    if (productIdx === -1) return null;

    const existing = database[productIdx];

    if (!existing) {
      return null;
    }

    const updatedProduct = {
      ...existing,
      ...changes,
    };

    database[productIdx] = updatedProduct;

    return updatedProduct;
  }
}
