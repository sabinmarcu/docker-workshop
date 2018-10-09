export type StoreItem = {
  id: number,
  title: string,
  finished: boolean,
}

export type Store = {
  todos: StoreItem[],
  unfinished: StoreItem[],
}

export interface StorageAdapter {
  getItems: () => StoreItem[],
  storeItems: (StoreItem[]) => boolean,
}
