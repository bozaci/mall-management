import { list } from '@keystone-6/core';
import { text, relationship, password, timestamp, checkbox } from '@keystone-6/core/fields';
import { userIsAdmin } from '../utils/user-is-admin';

const userList = list({
  access: {
    operation: {
      query: () => true,
      create: userIsAdmin,
      update: userIsAdmin,
      delete: userIsAdmin,
    },
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
    name: text({ validation: { isRequired: true } }),
    firstname: text({ validation: { isRequired: true } }),
    lastname: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    phoneNumber: text(),
    phoneNumberRegionCode: text(),
    password: password({ validation: { isRequired: true } }),
    isAdmin: checkbox({ defaultValue: false }),
    registeredAt: timestamp({ defaultValue: { kind: 'now' } }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    mall: relationship({ ref: 'Mall.users' }),
  },
});

module.exports = userList;
