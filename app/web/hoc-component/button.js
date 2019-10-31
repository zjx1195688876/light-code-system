import React from 'react';
import { Button } from 'antd';

const HOCButton = props => {
  const parsedProps = Object.assign({}, {
    type: 'primary',
    shape: 'round'
  }, props);
  return React.createElement(
    Button,
    { ...parsedProps },
    props.text ? props.text : null
  );
};

export default HOCButton;
