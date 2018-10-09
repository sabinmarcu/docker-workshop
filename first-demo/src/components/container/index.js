import React from 'react';

import List from '../list';
import Form from '../form';
import Chooser from '../chooser';

import style from './style.module.css';

export default () => (
  <section className={style.container}>
    <section className={style.wrapper}>
      <Form />
      <List />
      <Chooser />
    </section>
  </section>
);
