import { isObjectLike } from 'lodash';
const boolEnum = [true, false, null, undefined];

const _getContent = config => {
  const components = config.map(item => item.type).join(', ');
  const componentsReactNode = config.map(item => {
    let props = '';
    for (let key in item.props) {
      if (item.props[key] !== null) {
        if (boolEnum.indexOf(item.props[key]) > -1) { // 布尔类型
          props += `${key}={${item.props[key]}} `;
        } else if (isObjectLike(item.props[key])) { // 数组或对象等类对象类型
          props += `${key}={${JSON.stringify(item.props[key])}} `;
        } else {
          props += `${key}="${item.props[key]}" `;
        }
      }
    }
    if (item.props.text) { // 有children
      return `<${item.type} ${props}>${item.props.text}</${item.type}>`;
    } else {
      return `<${item.type} ${props} />`;;
    }
  }).join('\n');

  return `
    import React from 'react';
    import { ${components} } from antd; // 代码生成
    import 'antd/dist/antd.css';

    class App extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
        return (
          <>
            ${componentsReactNode}
          </>
        );
      }
    }
  `;
};

const generateCode = (config, fileName) => {
  const content = _getContent(config);
  // 创建隐藏的可下载链接
  const a = document.createElement('a');
  a.download = fileName;
  a.style.display = 'none';
  // 字符内容转变成blob地址
  const blob = new Blob([content]);
  a.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(a);
  a.click();
  // 然后移除
  document.body.removeChild(a);
};

export default generateCode;
