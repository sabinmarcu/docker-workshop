import React, { Component } from 'react';
import Store from '../../mobx/store';

import style from './style.module.css';

export default class NewTodo extends Component<{}, {state: string}> {
  state = {
    text: '',
  }

  addItem = text => Store.addItem(text).then(() => this.setState({ text: '' }))

  render() {
    const { text } = this.state;
    return (
      <div className={style.wrapper}>
        <input className={style.input} type="text" value={text} onChange={({ target: { value } }) => this.setState({ text: value })} />
        <button className={style.button} type="button" onClick={() => text && text.length > 0 && this.addItem(text)}>Add Todo</button>
      </div>
    );
  }
}
