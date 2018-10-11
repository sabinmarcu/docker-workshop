import React, { Component } from 'react';
import API from '../../mobx/api';

import style from '../form/style.module.css';

export default class LoginComponent extends Component {
  state = { secret: '' }

  attemptLogin = text => API.auth(text)

  render() {
    const { secret } = this.state;
    return (
      <div className={style.wrapper}>
        <input className={style.input} type="text" value={secret} onChange={({ target: { value } }) => this.setState({ secret: value })} />
        <button className={style.button} type="button" onClick={() => secret && secret.length > 0 && this.attemptLogin(secret)}>Login</button>
      </div>
    );
  }
}
