import React from 'react';
import SideBarBlock from '../side-bar-block/index';
import './index.css';

const List = (props) => {
  const { SideBarList = [] } = props;
  const listDOM = SideBarList.map(item =>
    <SideBarBlock
      key={ item.key }
      title={ item.title }
      list={ item.list }
    />
  );
  return (
   <>{ listDOM }</>
  );
};

const SideBar = (props) => {
  return (
    <nav>
      <List SideBarList={props.SideBarList} />
    </nav>
  );
};

export default SideBar;
