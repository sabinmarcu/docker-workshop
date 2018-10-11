import {
  observable, action, computed,
} from 'mobx';

import { RC_AUTH_PORT } from 'dotenv';

export class API {
  endpoint = RC_AUTH_PORT !== 'null' ? `//localhost:${RC_AUTH_PORT}/auth` : null;

  @observable key = null

  @action setKey = (key) => {
    this.key = key;
  }

  @computed get headers() {
    return (this.key ? { Authorization: `Bearer ${this.key}` } : {});
  }

  fetch = (url, options) => fetch(url, {
    ...options,
    headers: {
      ...(options ? options.headers : {}),
      ...this.headers,
    },
  })

  auth = async (secret) => {
    console.log('Requesting', fetch, secret);
    const response = await fetch(this.endpoint, {
      method: 'POST',
      body: JSON.stringify({ secret }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(data => data.json());
    if (response.key) {
      this.setKey(response.key);
    }
  }
}

export default new API();
