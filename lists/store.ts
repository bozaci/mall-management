import { list } from '@keystone-6/core';
import { text, relationship, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

const storeList = list({
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
    name: text({ validation: { isRequired: true } }),
    type: relationship({
      ref: 'StoreType',
      many: true,
    }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    mall: relationship({ ref: 'Mall.stores', many: true }),
    client: relationship({ ref: 'Client.store', many: true }),
    payments: relationship({ ref: 'Payment.store', many: true }),
  },
});

module.exports = storeList;
