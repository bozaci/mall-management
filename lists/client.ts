import { list } from '@keystone-6/core';
import { text, timestamp, relationship } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

const clientList = list({
  access: {
    operation: allowAll,
    filter: {
      query: ({ session }) => {
        if (session?.data.isAdmin) return {};

        if (session?.data.mall.id)
          return {
            mall: {
              id: { equals: session?.data.mall.id },
            },
          };

        return {};
      },
    },
  },

  fields: {
    firstname: text({ validation: { isRequired: true } }),
    lastname: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    phoneNumber: text(),
    phoneNumberRegionCode: text(),
    registeredAt: timestamp({ defaultValue: { kind: 'now' } }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    store: relationship({
      ref: 'Store.client',
      many: false,
    }),
    mall: relationship({
      ref: 'Mall.clients',
      many: false,
    }),
    payments: relationship({
      ref: 'Payment.client',
      many: true,
    }),
  },
  hooks: {
    validateInput: async ({ resolvedData, addValidationError }) => {
      if (resolvedData.phone_number && !resolvedData.phone_number_region_code) {
        addValidationError('Phone number region code is required if phone number is provided.');
      }
    },
  },
});

module.exports = clientList;
