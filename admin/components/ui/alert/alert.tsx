import React, { FC } from 'react';
import { AlertProps } from './alert.type';
import cx from 'classnames';

import './alert.scss';

const Alert: FC<AlertProps> = ({ theme, text }) => {
  return (
    <div
      className={cx('alert', {
        [`alert--theme-${theme}`]: theme,
      })}
    >
      <p className="alert__text">{text}</p>
    </div>
  );
};

export default Alert;
