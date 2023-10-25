import { loadJSONFromFile } from '../libs/read-json';
import type { CartDb } from '../types';
import makeCartList from './models/carts-list.model';
import makeCartsEndpointHandler from './use-cases/carts-endpoint';

const cartDb: CartDb[] = loadJSONFromFile('./carts.json');
const cartsList = makeCartList({ database: cartDb });
export type CartList = typeof cartsList;
const cartsEndpointHandler = makeCartsEndpointHandler({ cartsList });

export default cartsEndpointHandler;
