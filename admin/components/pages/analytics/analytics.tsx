import React from 'react';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { Heading } from '@keystone-ui/core';
import { useQuery } from '@keystone-6/core/admin-ui/apollo';
import { GET_PAYMENTS_BY_WHERE } from '../../../graphql/queries/payments';
import { getSession } from '../../../utils/get-session';

// States
import AnalyticsLoading from './states/loading';
import AnalyticsError from './states/error';
import AnalyticsContent from './states/content';

const Analytics = () => {
  const { user } = getSession();
  const {
    data = [],
    error,
    loading,
  } = useQuery(GET_PAYMENTS_BY_WHERE(`mall: { every: { id: { equals: "${user?.mall?.id}" } } }`));

  const renderContent = () => {
    if (loading) return <AnalyticsLoading />;
    if (error) return <AnalyticsError message={error.message} />;
    if (!data.payments.length) return <AnalyticsError message="Data is not found." />;

    return <AnalyticsContent data={data.payments} mallName={user?.mall.name || '-'} />;
  };

  return (
    <PageContainer header={<Heading type="h3">Analytics</Heading>}>
      <div
        className="analytics__header"
        style={{
          marginBottom: 30,
          paddingBottom: 30,
          borderBottom: '1px solid #ececec',
        }}
      >
        <h1 style={{ marginBottom: 5 }}>Analytics</h1>
        <span>This page is analytics for Payments.</span>
      </div>

      <div className="analytics__body">{renderContent()}</div>
    </PageContainer>
  );
};

export default Analytics;
