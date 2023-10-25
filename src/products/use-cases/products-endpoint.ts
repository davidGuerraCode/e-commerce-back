import {
  InvalidPropertyError,
  RequiredParameterError,
  UniqueConstraintError,
} from '../../libs/errors';
import makeHttpError from '../../libs/http-error';
import type { Product } from '../../types';
import type { HttpRequest } from '../../types/http-request';
import makeProduct from '../dtos/products';
import { type ProductList } from '../index';

export default function makeProductsEndpointHandler({
  productList,
}: {
  productList: ProductList;
}) {
  return async function handle(httpRequest: HttpRequest<Product>) {
    switch (httpRequest.method) {
      case 'POST':
        return postProduct(httpRequest);
      case 'GET':
        return getProducts(httpRequest);
      case 'DELETE':
        return deleteProduct(httpRequest);
      case 'PUT':
        return updateProduct(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getProducts(httpRequest: HttpRequest<Product>) {
    const { pid } = httpRequest.pathParams || {};
    const { limit } = httpRequest.queryParams || {};
    const result = pid
      ? await productList.findById({ productId: pid })
      : await productList.findAll({ limit });

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postProduct(httpRequest: HttpRequest<Product>) {
    let productData = httpRequest.body;

    if (!productData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        productData = JSON.parse(productData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      const newProduct = makeProduct(productData as Product);
      const result = await productList.add(newProduct);

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
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

  async function updateProduct(httpRequest: HttpRequest<Product>) {
    let productData = httpRequest.body;
    const { pid } = httpRequest.pathParams || {};

    if (!productData) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No PATCH body.',
      });
    }
    if (!pid) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No product id provided.',
      });
    }
    if (typeof httpRequest.body === 'string') {
      try {
        productData = JSON.parse(productData as string);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. PUT body must be valid JSON.',
        });
      }
    }

    try {
      const existingProduct = await productList.findById({ productId: pid });

      if (!existingProduct) {
        return makeHttpError({
          statusCode: 404,
          errorMessage: 'Product not found.',
        });
      }

      const newProduct = makeProduct({
        ...existingProduct,
        ...(productData as Product),
      });

      const result = await productList.update({
        productId: pid,
        changes: newProduct,
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

  async function deleteProduct(httpRequest: HttpRequest<Product>) {
    const { pid } = httpRequest.pathParams || {};

    if (!pid) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. Product id is missing.',
      });
    }

    await productList.remove({ productId: pid });

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 204,
      data: JSON.stringify({ success: true, message: 'Product deleted.' }),
    };
  }
}
