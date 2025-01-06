import { list } from '@keystone-6/core';
import { text, timestamp, relationship } from '@keystone-6/core/fields';
import { userIsAdmin } from '../utils/user-is-admin';

const paymentMethodList = list({
  access: {
    operation: {
      query: () => true,
      create: userIsAdmin,
      update: userIsAdmin,
      delete: userIsAdmin,
    },
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    payments: relationship({ ref: 'Payment.paymentMethod', many: true }),
  },
});

module.exports = paymentMethodList;
