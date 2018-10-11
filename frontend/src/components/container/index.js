import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import List from '../list';
import Form from '../form';
import Chooser from '../chooser';
import Login from '../auth';

import API from '../../mobx/api';

import style from './style.module.css';

export default observer(
  () => (
    <section className={style.container}>
      <section className={style.wrapper}>
        {!API.endpoint || API.key ? (
          <Fragment>
            <Form />
            <List />
            <Chooser />
          </Fragment>
        ) : (
          <Fragment>
            <h1>Login</h1>
            <Login />
          </Fragment>
        )}
      </section>
    </section>
  ),
);
