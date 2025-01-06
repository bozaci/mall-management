import { gql } from '@keystone-6/core/admin-ui/apollo';

export const GET_PAYMENTS_BY_WHERE = (where: any) => {
  return gql`
    query Payments {
      payments(where: { ${where} }) {
        id,
        amount
        status
        createdAt
        store {
          name
        }
        paymentMethod {
          name
        }
        paymentCurrency {
          symbol
        }
      }
    }
  `;
};
