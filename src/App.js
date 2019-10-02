import React from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
// import LayoutTest from './layout/layout-test/index';
import COMPONENTS_GENERATE_FUNCTION from './config/constant';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        text: '按钮文字',
        type: 'primary',
        onChangeText: this.onChangeText.bind(this),
        onChangeType: this.onChangeType.bind(this),
      },
      section: {
        string: '',
        element: null,
        property: null,
      },

      isShowComponentModal: false,
    };
  }

  onClickMenuItem = data => {
    console.log('data: ', data);
    console.log('key: ', data.key);
  }
  
  // 核心：数据流的管理
  onAddCopmponent = type => {
    const { string, element, property } = COMPONENTS_GENERATE_FUNCTION(type)(this.state.config);
    this.setState({
      section: {
        string,
        element,
        property,
      },
    });
  }

  onChangeText = e => {
    let config = this.state.config;
    config.text = e.currentTarget.value;
    const { string, element, property } = COMPONENTS_GENERATE_FUNCTION('button')(config);
    this.setState({
      section: {
        string,
        element,
        property,
      },
    });
    console.log('string: ', string);
  }

  onChangeType = e => {
    let config = this.state.config;
    config.type = e.currentTarget.value;
    const { string, element, property } = COMPONENTS_GENERATE_FUNCTION('button')(config);
    this.setState({
      section: {
        string,
        element,
        property,
      },
    });
  }

  onToggleComponentModal = (type = false) => {
    this.setState({
      isShowComponentModal: type,
    });
  }

  onDownLoadFile = (content, filename) => {
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
        <Layout>
          <Header className="ant-layout-header_extend">代码生成平台</Header>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={['page']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="page" onClick={this.onClickMenuItem}>页面</Menu.Item>
                <Menu.Item key="layout" onClick={this.onClickMenuItem}>布局</Menu.Item>
                <Menu.Item key="component" onClick={this.onClickMenuItem}>物料</Menu.Item>
              </Menu>
            </Sider>
            <Content>
              {/* 代码生成区和预览区 开始 */}
              <div className="section" data-id="section_1">
                {this.state.section.element}
              </div>
              {/* 代码生成区和预览区 结束 */}

              <div className="download-button-box">
                <Button
                  className="download-button"
                  type="primary"
                  shape="round"
                  icon="plus"
                  onClick={() => this.onToggleComponentModal(true)}
                >
                  添加组件
                </Button>
                <Button
                  className="download-button"
                  type="primary"
                  shape="round"
                  icon="download"
                  onClick={() => this.onDownLoadFile(this.state.section.string, 'button.js')}
                >
                  点击下载
                </Button>
              </div>
            </Content>
            <Content className="ant-layout-content_extend-property">
              <h2 className="property-title">属性</h2>
              {this.state.section.property}
            </Content>
          </Layout>
        </Layout>

        <Modal
          title="选择组件"
          visible={this.state.isShowComponentModal}
          onOk={() => this.onToggleComponentModal(false)}
          onCancel={() => this.onToggleComponentModal(false)}
          okText="确认"
          cancelText="取消"
        >
          <p onClick={() => this.onAddCopmponent('button')}>按钮</p>
          <p onClick={() => this.onAddCopmponent('input')}>输入框</p>
          <p onClick={() => this.onAddCopmponent('table')}>表格</p>
        </Modal>
      </>
    );
  }
}

export default App;
