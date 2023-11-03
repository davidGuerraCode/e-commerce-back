import type { Request } from 'express';
import type { HttpRequest } from '../types/http-request';

export default function adaptRequest<T>(req: Request): HttpRequest<T> {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    file: req.file,
  });
}
