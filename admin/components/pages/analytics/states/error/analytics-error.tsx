import React, { FC } from 'react';
import { AnalyticsErrorProps } from './analytics-error.type';

import Alert from '../../../../ui/alert';

const AnalyticsError: FC<AnalyticsErrorProps> = ({ message }) => {
  return <Alert theme="error" text={message} />;
};

export default AnalyticsError;
