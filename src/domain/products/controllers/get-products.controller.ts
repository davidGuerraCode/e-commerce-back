import type { ProductDb } from '../../../types';
import { type HttpRequest } from '../../../types/http-request';
import { buildResponse } from '../adapters/build-response.adapter';
import type { CountProducts, ListProducts } from '../use-cases';

export default function makeGetProducts({
  listProducts,
  countProducts,
}: {
  listProducts: ListProducts;
  countProducts: CountProducts;
}) {
  return async function getProducts(httpRequest: HttpRequest<ProductDb>) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { limit, page, query, sort } = httpRequest.queryParams || {};
      const totalCount = await countProducts();

      const result = await listProducts({
        limit: limit || 10,
        page: page || 1,
        query,
        sort,
      });
      const data = JSON.stringify(
        buildResponse({ payload: result, page, totalCount })
      );

      return {
        headers,
        statusCode: 200,
        data,
      };
    } catch (error) {
      return {
        headers,
        statusCode: 400,
        data: JSON.stringify({
          status: false,
          message: (error as Error).message,
        }),
      };
    }
  };
}
