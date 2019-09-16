import React from 'react';
import Header from './components/header/index';
// import LayoutTest from './layout/layout-test/index';
import COMPONENTS_GENERATE_FUNCTION from './config/constant';
import 'zent/css/index.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    this.state = {
      config: {
        text: '按钮文字',
        type: 'primary',
        onClickButton: this.onClickButton.bind(this),
        onChangeText: this.onChangeText.bind(this),
        onChangeType: this.onChangeType.bind(this),
      },
      section1: {
        string: '',
        eleemnt: {},
        property: null,
      },
      section2: {
        string: '',
        eleemnt: {},
        property: null,
      },
      propertyBlock: null,
    };
  }

  selectCopmponent = e => {
    console.log('key: ', e.currentTarget.dataset.key);
  }
  
  // 核心：数据流的管理
  addCopmponent = e => {
    const id = e.currentTarget.dataset.id;
    if (id === 'section_1') {
      const { string, element, property } = COMPONENTS_GENERATE_FUNCTION('button')(this.state.config);
      this.setState({
        section1: {
          string,
          element,
          property,
        },
      });
      console.log('string: ', string);
    }
  }

  onClickButton = e => {
    e.stopPropagation();
  }

  onChangeText = e => {
    let config = this.state.config;
    config.text = e.currentTarget.value;
    const { string, element, property } = COMPONENTS_GENERATE_FUNCTION('button')(config);
    this.setState({
      section1: {
        string,
        element,
        property,
      },
    });
  }

  onChangeType = e => {
    let config = this.state.config;
    config.type = e.currentTarget.value;
    const { string, element, property } = COMPONENTS_GENERATE_FUNCTION('button')(config);
    this.setState({
      section1: {
        string,
        element,
        property,
      },
    });
  }

  downLoadFile = (content, filename) => {
    // 创建隐藏的可下载链接
    const eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    const blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }

  render() {
    return (
      <>
        <Header />
        {/* <SideBar SideBarList = { SideBarList }/> */}
        <div className="container">
          <div className="side-bar">
            <span className="side-bar-item" data-key="key_1" onClick={this.selectCopmponent}>组件1</span>
            <span className="side-bar-item" data-key="key_2" onClick={this.selectCopmponent}>组件2</span>
            <span className="side-bar-item" data-key="key_3" onClick={this.selectCopmponent}>组件3</span>
            <span className="side-bar-item" data-key="key_4" onClick={this.selectCopmponent}>组件4</span>
            <span className="side-bar-item" data-key="key_5" onClick={this.selectCopmponent}>组件5</span>
          </div>
          <div className="main">
            {/* 代码生成区和预览区 开始 */}
            <div className="section" data-id="section_1" onClick={this.addCopmponent}>
              {this.state.section1.element}
            </div>
            <div className="section" data-id="section_2" onClick={this.addCopmponent}>
              {/* <!-- layout-slot --> */}
            </div>
            {/* 代码生成区和预览区 结束 */}

            <button onClick={() => this.downLoadFile(this.state.section1.string, 'button.js')}>点击下载</button>
          </div>
          <div className="property">
            <h2 className="property-title">属性</h2>
            {this.state.section1.property}
          </div>
        </div>
      </>
    );
  }
}

export default App;
