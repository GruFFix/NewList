import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import style from './style.scss';

const Spinner = ({ title }) =>
  <div className={style.root}>
    <CircularProgress />
  </div>;

export default Spinner;
