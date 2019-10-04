import React from 'react';
import { Button } from 'antd';

const renderButton = props => {
  return <Button type={props.type}>{props.text}</Button>;
};

export default renderButton;
