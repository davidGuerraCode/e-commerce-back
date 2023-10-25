import type { Request, Response } from 'express';
import handleProductsRequest from '..';
import adaptRequest from '../../libs/adapt-request';
import type { Product } from '../../types';

export async function productsController(req: Request, res: Response) {
  const httpRequest = adaptRequest<Product>(req);

  try {
    const { headers, statusCode, data } = await handleProductsRequest(
      httpRequest
    );

    res.set(headers).status(statusCode).send(data);
  } catch (error) {
    res.status(500).end();
  }
}
