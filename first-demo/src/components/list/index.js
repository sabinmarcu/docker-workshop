import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from '../../mobx/store';

import style from './style.module.css';

export default @observer class TodoItems extends Component {
  render() {
    return (
      <ul className={style.list}>
        {Store.todos.map(item => (
          <li className={[style.item, item.finished && style.done].join(' ')} key={item.id}>
            <div className={style.title}>
              {item.title}
            </div>
            <div className={style.buttons}>
              <div className={[style.check, style.button].join(' ')} onClick={item.toggle}>
                &#10003;
              </div>
              <div className={[style.delete, style.button].join(' ')} onClick={() => Store.todos.remove(item)}>
                X
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
