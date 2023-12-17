import type { SuccessResponse } from '../../../types';

export const buildResponse = <T>({
  payload,
  page,
  totalCount,
}: {
  payload: T;
  page: number;
  totalCount: number;
}) => {
  const totalPages = Math.ceil(totalCount / 10);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalCount;

  const response: SuccessResponse<T> = {
    status: true,
    payload,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page ? page + 1 : null,
    page,
    hasPrevPage,
    hasNextPage,
    prevLink: hasPrevPage ? `/products?page=${page - 1}` : null,
    nextLink: hasNextPage ? `/products?page=${page + 1}` : null,
  };

  return response;
};
