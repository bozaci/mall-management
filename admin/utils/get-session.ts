import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';

export const getSession = () => {
  try {
    const { data, error, loading } = useQuery(gql`
      query AuthenticatedItem {
        authenticatedItem {
          ... on User {
            id
            name
            email

            mall {
              id
              name
            }
          }
        }
      }
    `);

    if (loading)
      return {
        status: 'loading',
        message: 'Fetching session data..',
      };

    if (error)
      return {
        status: 'error',
        message: error.message || 'Error ocurred.',
      };

    if (!data?.authenticatedItem)
      return {
        status: 'no-data',
        message: 'Data not found.',
      };

    return {
      status: 'success',
      user: data.authenticatedItem,
    };
  } catch (e) {
    return {
      status: 'error',
      message: e || 'An error occurred while fetching session data.',
    };
  }
};
