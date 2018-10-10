import React from 'react';
import Store from '../../mobx/store';
import Adapters from '../../mobx/adapters';

import style from './style.module.css';

export default () => (
  <div className={style.container}>
    <div className={style.item}>Choose Adapter:</div>
    {Object.keys(Adapters).map(adapter => (
      <div
        key={adapter}
        className={[style.item, style.button].join(' ')}
        onClick={() => Store.changeAdapter(Adapters[adapter])}
      >
        {adapter}
      </div>
    ))}
  </div>
);
