import React from 'react';
import { Input } from 'antd';

const renderInput = props => {
  return <Input
    addonBefore={props.addonBefore}
    addonAfter={props.addonAfter}
    placeholder={props.placeholder}
  />;
};

export default renderInput;
