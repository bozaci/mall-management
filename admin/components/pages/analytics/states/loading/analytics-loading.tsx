import React from 'react';
import Loader from '../../../../ui/loader';

const AnalyticsLoading = () => {
  return (
    <div className="analytics__loading">
      <Loader text="Loading Analytics.." />
    </div>
  );
};

export default AnalyticsLoading;
