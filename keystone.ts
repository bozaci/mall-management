import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'mysql',
      url: process.env.DATABASE_URL || '',
    },
    lists,
    session,
  }),
);
