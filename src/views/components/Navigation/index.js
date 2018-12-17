import React from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import style from './style.scss';

const Navigation = ({ activeItemKey, onChangeTab, items }) =>
  <Paper>
    {items.map((tab, index) =>
      <div
        className={style.menuItem}
        key={index}
        onClick={() => onChangeTab(index)}
      >
        <Button
          color="primary"
          variant={activeItemKey === index ? 'contained' : 'text'}
        >
          {tab}
        </Button>
      </div>,
    )}
  </Paper>;

export default Navigation;
