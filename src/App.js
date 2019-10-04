import React from 'react';
import Components from './components/index';
// import generateCode from './components_render/index';
import 'antd/dist/antd.css';
import './App.css';

const antd = require('antd'); // 为了使用React.createElement(antd[type])的方式生成代码，只能用commonJs的方式引入
const { Layout, Menu, Button, Modal, Input, Select } = antd;
const { Header, Sider, Content } = Layout;
const { Option } = Select;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComponent: {}, // 当前选中的组件
      isShowComponentModal: false,
    };
  }

  onClickMenuItem = data => {
    console.log('data: ', data);
    console.log('key: ', data.key);
  }
  
  // 核心：数据流的管理
  onAddCopmponent = type => {
    console.log('type: ', type);
    this.setState({
      currentComponent: Components[type] || {}
    });
  }

  onToggleComponentModal = (type = false) => {
    this.setState({
      isShowComponentModal: type,
    });
  }

  onDownLoadFile = (content, filename) => {
    console.log('下载文件');
  }

  onChangeSelect = (val, key) => {
    const props = Object.assign({}, this.state.currentComponent.props, { [key]: val });
    const currentComponent = Object.assign({}, this.state.currentComponent, { props });

    this.setState({ // 更新对象某个值的时候要这样更新
      currentComponent
    });
  }

  onChangeInput = (e, key) => {
    const props = Object.assign({}, this.state.currentComponent.props, { [key]: e.target.value });
    const currentComponent = Object.assign({}, this.state.currentComponent, { props });

    this.setState({ // 更新对象某个值的时候要这样更新
      currentComponent
    });
  }

  // parseComponent = () => {
  //   const type = this.state.currentComponent.type;
  //   const props = this.state.currentComponent.props;
    
  //   return generateCode(type)(props);
  // }

  renderProps = () => {
    const { type, props } = this.state.currentComponent;

    return type ? React.createElement(
      antd[type],
      props,
      props.text ? props.text : null
    ) : null;
  }

  // 右侧的属性渲染，以及属性的变更
  renderConfig = () => {
    const { props, config } = this.state.currentComponent;
    const configDOM = [];
    for (let key in config) {
      let label = null;
      if (config[key].enum) { // 存在枚举类型，则用select
        label = <label key={key}>
          {config[key].label}：
          <Select defaultValue={props[key]} style={{ width: 200 }} onChange={val => {this.onChangeSelect(val, key)}}>
            {config[key].enum.map(item => {
              return <Option key={item} value={item}>{item}</Option>;
            })}
          </Select>
        </label>;
      } else { // 否则使用input框
        label = <label key={key}>{
          config[key].label}：
          <Input value={props[key]} onChange={e => {this.onChangeInput(e, key)}} />
        </label>;
      }
      configDOM.push(label);
    }

    return configDOM;
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
                { this.renderProps() }
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
              {this.renderConfig()}
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
          <p onClick={() => this.onAddCopmponent('VisButton')}>按钮</p>
          <p onClick={() => this.onAddCopmponent('VisInput')}>输入框</p>
          <p onClick={() => this.onAddCopmponent('VisTable')}>表格</p>
        </Modal>
      </>
    );
  }
}

export default App;
