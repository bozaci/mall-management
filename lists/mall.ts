import { list } from '@keystone-6/core';
import { text, relationship, timestamp, json, integer } from '@keystone-6/core/fields';
import { userIsAdmin } from '../utils/user-is-admin';

const mallList = list({
  access: {
    operation: {
      query: () => true,
      create: userIsAdmin,
      update: userIsAdmin,
      delete: userIsAdmin,
    },
    filter: {
      query: ({ session }) => {
        if (session?.data.isAdmin) return true;

        if (session?.data.id)
          return {
            users: {
              some: {
                id: { equals: session?.data.id },
              },
            },
          };

        return true;
      },
    },
  },

  fields: {
    name: text({ validation: { isRequired: true } }),
    location: json({
      defaultValue: {
        address: '',
        city: '',
        country: '',
      },
    }),
    openingHours: json({
      defaultValue: {
        monday: '',
        tuesday: '',
        wednessday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
      },
    }),
    totalStores: integer(),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    users: relationship({ ref: 'User.mall', many: true }),
    stores: relationship({ ref: 'Store.mall', many: true }),
    clients: relationship({
      ref: 'Client.mall',
      many: true,
    }),
    payments: relationship({
      ref: 'Payment.mall',
      many: true,
    }),
  },
});

module.exports = mallList;
