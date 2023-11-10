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
router.get('/:pid', makeExpressCallback(getProduct));
router.post('/', makeExpressCallback(postProduct));
router.delete('/:pid', makeExpressCallback(removeProduct));
router.put('/:pid', makeExpressCallback(putProduct));

export default router;
