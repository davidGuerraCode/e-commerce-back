import { z } from 'zod';

export const cartSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive().default(0),
    })
  ),
});
