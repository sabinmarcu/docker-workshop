import { differenceWith, map } from 'ramda';

import { RC_BACKEND_PORT } from 'dotenv';
import type { StorageAdapter } from '../types';
import { Todo } from '../store';
import API from '../api';

const endpoint = '/todos';
const server = `//localhost:${RC_BACKEND_PORT}`;
const api = `${server}${endpoint}`;

const fetchRemote = async () => API.fetch(api).then(data => data.json());
const createTodo = ({ title, finished, id }) => new Todo(title, finished, id);

const deleteItem = ({ id }) => API.fetch(`${api}/${id}`, { method: 'DELETE' });
const addItem = data => API.fetch(api, {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'content-type': 'application/json',
  },
});

export default class ApiAdapter implements StorageAdapter {
  getItems = async () => map(createTodo)(await fetchRemote())

  storeItems = async items => map(deleteItem, await (async () => differenceWith(
    (a, b) => a.id === b.id,
    await fetchRemote(),
    items,
  ))()) && map(addItem, await (async () => differenceWith(
    (a, b) => a.id === b.id,
    items,
    await fetchRemote(),
  ))());
}
