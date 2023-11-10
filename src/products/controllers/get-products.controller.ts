import type { ProductDb } from '../../types';
import { type HttpRequest } from '../../types/http-request';
import type { ListProducts } from '../use-cases';

export default function makeGetProducts({
  listProducts,
}: {
  listProducts: ListProducts;
}) {
  return async function getProducts(httpRequest: HttpRequest<ProductDb>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { limit } = httpRequest.queryParams || {};
      const result = await listProducts({ limit });

      return {
        headers,
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (error) {
      return {
        headers,
        statusCode: 400,
        data: JSON.stringify({
          success: false,
          message: (error as Error).message,
        }),
      };
    }
  };
}
