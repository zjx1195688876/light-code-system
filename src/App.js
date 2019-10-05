import React from 'react';
import Components from './components/index';
// import generateCode from './components_render/index';
import 'antd/dist/antd.css';
import './App.css';
import { generateCode } from './utils';

const antd = require('antd'); // 为了使用React.createElement(antd[type])的方式生成代码，只能用commonJs的方式引入
const { Layout, Menu, Button, Modal, Input, Select } = antd;
const { Header, Sider, Content } = Layout;
const { Option } = Select;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentIndex: 0, // 组件的唯一id，累加
      allComponent: [], // 当前应用的组件集合
      isShowComponentModal: false,
      isShowFileModal: false,
      fileName: ''
    };
  }

  onClickMenuItem = data => {
    console.log('data: ', data);
    console.log('key: ', data.key);
  }
  
  onAddCopmponent = type => {
    this.resetSelectComponent(); // 重置当前选中的组件
    let { allComponent, componentIndex } = this.state;
    componentIndex++; // 累加
    // 如果当前布局有多个相同类型的组件，需要通过Object.assign的方式，避免同类型组件间的状态污染
    const component = Object.assign({}, Components[type]);
    component.isSelected = true; // 当前添加的组件为选中状态
    component.index = componentIndex; // 添加组件的唯一id
    const newAllComponent = [...allComponent, component];
    this.setState({
      allComponent: newAllComponent,
      componentIndex
    });
  }

  resetSelectComponent = () => {
    const { allComponent } = this.state;
    allComponent.map(component => {
      return component.isSelected = false;
    });
  }

  onToggleComponentModal = (type = false) => {
    this.setState({
      isShowComponentModal: type,
    });
  }

  onToggleFileModal = (type = false) => {
    this.setState({
      isShowFileModal: type,
    });
  }

  onDownLoadFile = () => {
    const { allComponent, fileName } = this.state;
    if (fileName) {
      generateCode(allComponent, fileName);
    }
  }

  onChangeFileNameInput = e => {
    this.setState({
      fileName: e.target.value || ''
    });
  }

  // 右侧属性更新枚举类型
  onChangeSelect = (val, key) => {
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter(component => component.isSelected);
    const props = Object.assign({}, currentComponent.props, { [key]: val });
    currentComponent = Object.assign({}, currentComponent, { props });
    const index = currentComponent.index;

    allComponent.splice(index-1, 1, currentComponent);

    this.setState({
      allComponent
    });
  }
  
  // 右侧属性更新input输入框
  onChangeInput = (e, key) => {
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter(component => component.isSelected);
    const props = Object.assign({}, currentComponent.props, { [key]: e.target.value });
    currentComponent = Object.assign({}, currentComponent, { props });
    const index = currentComponent.index;

    allComponent.splice(index-1, 1, currentComponent); // splice改变数组自身

    this.setState({
      allComponent
    });

    // const props = Object.assign({}, this.state.currentComponent.props, { [key]: e.target.value });
    // const currentComponent = Object.assign({}, this.state.currentComponent, { props });

    // this.setState({ // 更新对象某个值的时候要这样更新
    //   currentComponent
    // });
  }

  // parseComponent = () => {
  //   const type = this.state.currentComponent.type;
  //   const props = this.state.currentComponent.props;
    
  //   return generateCode(type)(props);
  // }

  renderProps = () => {
    const { allComponent } = this.state;
    if (!allComponent.length) {
      return null;
    }

    const arr = allComponent.map((component, index) => {
      const { type, props } = component;
      return type ? React.createElement(
        antd[type],
        {
          ...props,
          key: index,
          onClick: () => { this.selectComponent(component) }
        },
        props.text ? props.text : null
      ) : null;
    });

    return arr;
  }

  // 点击组件，更换当前选中的组件
  selectComponent = selectedComponent => {
    this.resetSelectComponent();
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter(component => component.index === selectedComponent.index);
    currentComponent = Object.assign({}, currentComponent, { isSelected: true });
    const index = currentComponent.index;

    allComponent.splice(index-1, 1, currentComponent); // splice改变数组自身

    this.setState({
      allComponent
    });
  }

  // 右侧的属性渲染，以及属性的变更
  renderConfig = () => {
    const { allComponent } = this.state;
    if (!allComponent.length) {
      return null;
    }
    const [currentComponent] = allComponent.filter(component => component.isSelected);
    const { props, config } = currentComponent;
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
                  onClick={() => this.onToggleFileModal(true)}
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

        <Modal
          title="请输入生成文件的名称"
          visible={this.state.isShowFileModal}
          onOk={() => this.onDownLoadFile()}
          onCancel={() => this.onToggleFileModal(false)}
          okText="确认"
          cancelText="取消"
        >
          <Input value={this.state.fileName} onChange={e => {this.onChangeFileNameInput(e)}} />
        </Modal>
      </>
    );
  }
}

export default App;
