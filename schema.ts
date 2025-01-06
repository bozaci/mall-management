import { type Lists } from '.keystone/types';

const USER_SCHEMA = require('./lists/user');
const CLIENT_SCHEMA = require('./lists/client');
const MALL_SCHEMA = require('./lists/mall');
const STORE_SCHEMA = require('./lists/store');
const STORE_TYPE_SCHEMA = require('./lists/store-type');
const PAYMENT_SCHEMA = require('./lists/payment');
const PAYMENT_METHOD_SCHEMA = require('./lists/payment-method');
const PAYMENT_CURRENCY_SCHEMA = require('./lists/payment-currency');

export const lists = {
  User: USER_SCHEMA,
  Client: CLIENT_SCHEMA,
  Mall: MALL_SCHEMA,
  Store: STORE_SCHEMA,
  StoreType: STORE_TYPE_SCHEMA,
  Payment: PAYMENT_SCHEMA,
  PaymentMethod: PAYMENT_METHOD_SCHEMA,
  PaymentCurrency: PAYMENT_CURRENCY_SCHEMA,
} satisfies Lists;
