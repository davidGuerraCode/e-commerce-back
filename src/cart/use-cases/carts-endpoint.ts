import type { CartList } from '..';
import {
  InvalidPropertyError,
  RequiredParameterError,
  UniqueConstraintError,
} from '../../libs/errors';
import makeHttpError from '../../libs/http-error';
import type { Cart } from '../../types';
import type { HttpRequest } from '../../types/http-request';
import makeCart from '../dtos/carts';

export default function makeCartsEndpointHandler({
  cartsList,
}: {
  cartsList: CartList;
}) {
  return async function handle(httpRequest: HttpRequest<Cart>) {
    switch (httpRequest.method) {
      case 'PUT':
        return addProductToCart(httpRequest);
      case 'POST':
        return postCart(httpRequest);
      case 'GET':
        return getCarts(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function postCart(httpRequest: HttpRequest<Cart>) {
    let cartData = httpRequest.body;
    console.log('[X]', cartData);

    if (!cartData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        cartData = JSON.parse(cartData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      const newCart = makeCart(cartData as Cart);
      const result = await cartsList.add(newCart);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: (error as Error).message,
      });
    }
  }

  async function addProductToCart(httpRequest: HttpRequest<Cart>) {
    let cartData = httpRequest.body;
    const { cid, pid } = httpRequest.pathParams || {};

    if (!cartData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }
    if (!cid || !pid) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No Product id or cart id provided.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        cartData = JSON.parse(cartData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      const existingCart = await cartsList.findById({ cartId: cid });

      if (!existingCart) {
        return makeHttpError({
          statusCode: 404,
          errorMessage: 'Cart not found.',
        });
      }
      const newProduct = (cartData as Cart).products[0];

      if (!newProduct) {
        return makeHttpError({
          statusCode: 404,
          errorMessage: 'Invalid product.',
        });
      }

      const newCart = makeCart({
        ...existingCart,
        products: [
          ...existingCart.products,
          {
            productId: newProduct.productId,
            quantity: newProduct.quantity,
          },
        ],
      });
      const result = await cartsList.addToCart({
        cartId: cid,
        productId: pid,
        changes: newCart,
      });

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return makeHttpError({
        errorMessage: (error as Error).message,
        statusCode:
          error instanceof UniqueConstraintError
            ? 409
            : error instanceof InvalidPropertyError ||
              error instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  }

  async function getCarts(httpRequest: HttpRequest<Cart>) {
    const { cid } = httpRequest.pathParams || {};
    const result = cid
      ? await cartsList.findById({ cartId: cid })
      : await cartsList.findAll({ limit: 10 });

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }
}
