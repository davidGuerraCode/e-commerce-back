import type { Router } from 'express';
import express from 'express';

import makeExpressCallback from '../../libs/express-callback';
import type { Product } from '../../types';
import {
  getProduct,
  getProducts,
  postProduct,
  putProduct,
  removeProduct,
} from '../controllers';

const router: Router = express.Router();

router.get('/', makeExpressCallback<Product>(getProducts));
router.get('/:pid', makeExpressCallback<Product>(getProduct));
router.post('/', makeExpressCallback<Product>(postProduct));
router.delete('/:pid', makeExpressCallback<Product>(removeProduct));
router.put('/:pid', makeExpressCallback<Product>(putProduct));

export default router;
