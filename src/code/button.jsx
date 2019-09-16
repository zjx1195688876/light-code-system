import React from 'react';
import { Button } from 'zent';

const generateButton = config => {
  const string = `
    <Button type=${config.type}>${config.text}</Button>
  `;
  const element = (
    <Button type={config.type} onClick={config.onClickButton}>{config.text}</Button>
  );
  const property = (
    <>
      <label>文字：<input value={config.text} onChange={config.onChangeText} /></label>
      <label>属性：<input value={config.type} onChange={config.onChangeType} /></label>
    </>
  );
  return {
    string,
    element,
    property,
  };
};

export default generateButton;
