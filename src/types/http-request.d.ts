export type HttpRequest<T> = {
  path: string;
  method: string;
  pathParams: Record<string, string>;
  queryParams: Record<string, any>;
  body: T | string;
  file: File;
};
