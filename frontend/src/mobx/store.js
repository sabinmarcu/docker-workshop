import {
  observable, computed, reaction, action,
} from 'mobx';
import nanoid from 'nanoid';
import type { StoreItem, Store } from './types';

import adapters from './adapters';

export class Todo implements StoreItem {
  id = nanoid();

  @observable title = '';

  @observable finished = false;

  constructor(title = '', finished = false, id = null) {
    this.title = title;
    this.finished = finished;
    this.id = id || this.id;
  }

  @action setTitle = (title) => { this.title = title; }

  @action toggle = () => { this.finished = !this.finished; }
}

export class Todos implements Store {
  adapter = new adapters.ApiStorage();

  @observable todos = []

  @computed get unfinished() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  constructor() {
    this.initAdapter();
  }

  initAdapter = async () => {
    if (this.disableAutorun) {
      this.disableAutorun();
    }
    const items = await this.adapter.getItems();
    this.todos = items;
    this.disableAutorun = reaction(
      () => this.todos.map(it => it.finished),
      () => this.adapter.storeItems(this.todos),
    );
  }

  @action addItem = async text => this.todos.push(new Todo(text, false))

  @action removeItem = async (item: Todo) => this.todos.remove(item)

  @action changeAdapter = async (Adapter) => {
    this.adapter = new Adapter();
    this.initAdapter();
  };
}

export default new Todos();
