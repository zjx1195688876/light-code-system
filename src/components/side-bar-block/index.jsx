import React from 'react';
import './index.css';

const List = (props) => {
  const { list = [] } = props;
  const listDOM = list.map(item =>
    <li className="side-bar-block-item" id={item.id}>
      {item.name}
    </li>
  );
  return (
   <ul>{ listDOM }</ul>
  );
};

const SideBarBlock = (props) => {
  return (
    <div className="side-bar-block" key={props.key}>
      <h1>{ props.title }</h1>
      <List list={props.list} />
    </div>
  );
};

export default SideBarBlock;
