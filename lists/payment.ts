import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, timestamp, integer, select, text } from '@keystone-6/core/fields';

const paymentList = list({
  access: {
    operation: allowAll,
    filter: {
      query: ({ session }) => {
        if (session?.data.isAdmin) return {};

        if (session?.data.mall.id)
          return {
            mall: {
              some: {
                id: { equals: session?.data.mall.id },
              },
            },
          };

        return {};
      },
    },
  },

  fields: {
    client: relationship({
      ref: 'Client.payments',
      many: true,
      ui: {
        displayMode: 'select',
        labelField: 'email',
        searchFields: ['firstname', 'lastname'],
      },
    }),
    store: relationship({ ref: 'Store.payments', many: false }),
    mall: relationship({ ref: 'Mall.payments', many: true }),
    paymentMethod: relationship({ ref: 'PaymentMethod.payments', many: false }),
    paymentCurrency: relationship({ ref: 'PaymentCurrency.payments', many: false }),
    amount: integer({ validation: { isRequired: true } }),
    status: select({
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
      validation: { isRequired: true },
    }),
    notes: text(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
  },
});

module.exports = paymentList;
