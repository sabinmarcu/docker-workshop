import { differenceWith, map } from 'ramda';

import type { StorageAdapter } from '../types';
import { Todo } from '../store';

const endpoint = '/todos';
const server = '//localhost:4000';
const api = `${server}${endpoint}`;

const fetchRemote = async () => fetch(api).then(data => data.json());
const createTodo = ({ title, finished, id }) => new Todo(title, finished, id);

const deleteItem = ({ id }) => fetch(`${api}/${id}`, { method: 'DELETE' });
const addItem = data => fetch(api, {
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
