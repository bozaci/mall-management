import { list } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { userIsAdmin } from '../utils/user-is-admin';

const storeTypeList = list({
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
    created_at: timestamp({ defaultValue: { kind: 'now' } }),
  },
});

module.exports = storeTypeList;
