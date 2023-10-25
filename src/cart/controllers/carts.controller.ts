import type { Request, Response } from 'express';
import handleCartsRequest from '..';
import adaptRequest from '../../libs/adapt-request';
import type { Cart } from '../../types';

export async function cartsController(req: Request, res: Response) {
  const httpRequest = adaptRequest<Cart>(req);

  try {
    const { headers, statusCode, data } = await handleCartsRequest(httpRequest);

    res.set(headers).status(statusCode).send(data);
  } catch (error) {
    res.status(500).end();
  }
}
