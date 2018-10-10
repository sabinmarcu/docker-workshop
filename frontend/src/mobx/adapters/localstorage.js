import {
  compose, map, filter, difference,
} from 'ramda';
import type { StorageAdapter, StoreItem } from '../types';
import { Todo } from '../store';

const prefix = 'todo_';

const getArray = length => [...(new Array(length)).keys()];
const getKey = it => localStorage.key(it);
const makeKey = it => `${prefix}${it}`;
const filterKeys = it => it.startsWith(prefix);

const serialize = ({ title, finished, id }: StoreItem) => [`${title}|${finished}`, makeKey(id)];
const getTodo = it => [localStorage.getItem(it), it];

const destructure = ([it, key]) => [it.split('|'), key];
const createTodo = ([[title, finished], key]) => new Todo(title, JSON.parse(finished), key.replace(prefix, ''));
const deserialize = compose(createTodo, destructure);

const deleteItems = it => localStorage.removeItem(it);
const getTodoKeys = () => filter(filterKeys, map(getKey, getArray(localStorage.length)));

const selectId = ({ id }) => id;
const getCurrentKeys = items => map(compose(makeKey, selectId), items);

const storeItem = ([value, key]) => localStorage.setItem(key, value);

export default class LocalStsorageAdapter implements StorageAdapter {
  getItems = async () => map(compose(deserialize, getTodo), getTodoKeys())

  storeItems = async items => map(deleteItems, (() => difference(
    getTodoKeys(),
    getCurrentKeys(items),
  ))())
    && map(compose(storeItem, serialize), items)
}
