import { ObjectId } from 'mongodb';
import type { CartsCollection } from '.';
import type { Cart } from '../../../types';

export default function makeCartsDb({ db }: { db: CartsCollection }) {
  return Object.freeze({
    insert,
    remove,
    findById,
    findAll,
    update,
  });

  async function findAll() {
    return await db.find().toArray();
  }

  async function findById({ cartId }: { cartId: string }) {
    if (!cartId) return null;

    return await db.findOne({ _id: new ObjectId(cartId) });
  }

  async function insert({ cart }: { cart: Cart }) {
    const result = await db.insertOne(cart);

    return result;
  }

  async function remove({ cartId }: { cartId: string }) {
    const result = await db.findOneAndDelete({ _id: new ObjectId(cartId) });

    if (!result) return null;

    return true;
  }

  async function update({
    cartId,
    changes,
  }: {
    cartId: string;
    changes: Cart;
  }) {
    const result = await db.findOneAndUpdate(
      { _id: new ObjectId(cartId) },
      { $set: changes },
      { returnDocument: 'after' }
    );

    if (!result) return null;

    return result;
  }
}
