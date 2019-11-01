import React, { ReactNode } from 'react';
import Components from '@/component/index';
// import generateCode from './components_render/index';
import 'antd/dist/antd.css';
import { HOCButton } from '@/hoc-component/index';
import './Page.css';
import { generateCode, setBooleanToString, setStringToBoolean } from '@/utils';

const antd = require('antd'); // 为了使用React.createElement(antd[type])的方式生成代码，只能用commonJs的方式引入
const { Layout, Menu, Modal, Input, Select } = antd;
const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { info } = Modal;

interface IState {
  componentIndex: number; // 组件的唯一id，累加
  allComponent: Array<Record<string, any>>; // 当前应用的组件集合
  isShowComponentModal: boolean;
  isShowFileModal: boolean;
  fileName: string;
}

class Page extends React.Component<any, IState> {
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

  onClickMenuItem = (data: { key: string }) => {
    console.log('data: ', data);
    console.log('key: ', data.key);
  }
  
  onAddCopmponent = (type: string) => {
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

  resetSelectComponent = (): void => {
    const { allComponent } = this.state;
    allComponent.map((component: { isSelected: boolean }) => {
      return component.isSelected = false;
    });
  }

  onToggleComponentModal = (type: boolean = false) => {
    this.setState({
      isShowComponentModal: type,
    });
  }

  onToggleFileModal = (type: boolean = false) => {
    this.setState({
      isShowFileModal: type,
    });
  }

  onDownLoadFile = (): void => {
    const { allComponent, fileName } = this.state;
    if (fileName) {
      generateCode(allComponent, fileName);
    }
  }

  onChangeFileNameInput = (e: { target: { value: string } }) => {
    this.setState({
      fileName: e.target.value || ''
    });
  }

  // 右侧属性更新枚举类型
  onChangeSelect = (val: string, key: string) => {
    val = setStringToBoolean(val);
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter((component) => component.isSelected);
    const index = allComponent.indexOf(currentComponent);
    const props = Object.assign({}, currentComponent.props, { [key]: val });
    currentComponent = Object.assign({}, currentComponent, { props });

    allComponent.splice(index, 1, currentComponent);

    this.setState({
      allComponent
    });
  }
  
  // 右侧属性更新input输入框
  onChangeInput = (e: { target: { value: string } }, key: string) => {
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter((component: { isSelected: boolean }) => component.isSelected);
    const index = allComponent.indexOf(currentComponent);
    const props = Object.assign({}, currentComponent.props, { [key]: e.target.value });
    currentComponent = Object.assign({}, currentComponent, { props });

    allComponent.splice(index, 1, currentComponent); // splice改变数组自身

    this.setState({
      allComponent
    });

    // const props = Object.assign({}, this.state.currentComponent.props, { [key]: e.target.value });
    // const currentComponent = Object.assign({}, this.state.currentComponent, { props });

    // this.setState({ // 更新对象某个值的时候要这样更新
    //   currentComponent
    // });
  }

  onDeleteCurrentComponent = (): void => {
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter(component => component.isSelected);
    const index = allComponent.indexOf(currentComponent);

    allComponent.splice(index, 1); // 删除元素

    this.setState({
      allComponent
    });
  }

  onMoveCurrentComponent = (direction: string) => {
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter(component => component.isSelected);
    const index = allComponent.indexOf(currentComponent); // 当前选中的组件在数组中的位置
    if (direction === 'up') {
      if (index === 0) {
        info({
          content: '当前元素已经是第一位'
        });
        return;
      }
      allComponent[index] = allComponent[index-1];
      allComponent[index-1] = currentComponent;
    } else if(direction === 'down') {
      if (index === allComponent.length - 1) {
        info({
          content: '当前元素已经是最后一位'
        });
        return;
      }
      allComponent[index] = allComponent[index+1];
      allComponent[index+1] = currentComponent;
    }

    this.setState({
      allComponent
    });
  }

  // parseComponent = () => {
  //   const type = this.state.currentComponent.type;
  //   const props = this.state.currentComponent.props;
    
  //   return generateCode(type)(props);
  // }

  renderProps = (): ReactNode => {
    const { allComponent } = this.state;
    if (!allComponent.length) {
      return null;
    }

    const arr = allComponent.map((component: { type: string, index: number,  props: { text: string } }, index: number) => {
      const { type, props } = component;
      /* 没有直接将React.createElement返回的原因是因为，用<div>包裹之后会更好看
      * 当然，生成的代码是不会包含<div>的
      */
      const componentElement = type ? React.createElement(
        antd[type],
        {
          ...props,
          key: index
        },
        props.text ? props.text : null
      ) : null;

      return <div key={index} style={{margin: "0 0 15px"}} onClick={() => {this.selectComponent(component)}}>{componentElement}</div>
    });

    return arr;
  }

  // 点击组件，更换当前选中的组件
  selectComponent = ( selectedComponent: { index: number } ) => {
    this.resetSelectComponent();
    const { allComponent } = this.state;
    let [currentComponent] = allComponent.filter(component => component.index === selectedComponent.index);
    const index = allComponent.indexOf(currentComponent);
    currentComponent = Object.assign({}, currentComponent, { isSelected: true });

    allComponent.splice(index, 1, currentComponent); // splice改变数组自身

    this.setState({
      allComponent
    });
  }

  // 右侧的属性渲染，以及属性的变更
  renderConfig = (): ReactNode => {
    const { allComponent } = this.state;
    if (!allComponent.length) {
      return null;
    }
    const [currentComponent] = allComponent.filter(component => component.isSelected);
    if (!currentComponent) { // 当前元素删除，直接返回null
      return null;
    }
    const { props, config } = currentComponent;
    const configDOM: Array<ReactNode> = [];
    for (let key in config) {
      let label: ReactNode | ReactNode[] = null;
      if (config[key].enum) { // 存在枚举类型，则用select
        label = <label key={key}>
          {config[key].label}：
          {/* 因为antd的selct不支持Boolean类型的value，所以遇到Boolean类型的value先转为string，到时候再通过setStringToBoolean转回来 */}
          <Select defaultValue={setBooleanToString(props[key])} style={{ width: 200 }} onChange={val => {this.onChangeSelect(val, key)}}>
            {config[key].enum.map(item => {
              return <Option key={item} value={setBooleanToString(item)}>{String(item)}</Option>;
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

  render(): ReactNode {
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
                <HOCButton
                  className="download-button"
                  icon="plus"
                  text="添加组件"
                  onClick={() => this.onToggleComponentModal(true)}
                />
                <HOCButton
                  className="download-button"
                  type="primary"
                  shape="round"
                  icon="download"
                  text="点击下载"
                  onClick={() => this.onToggleFileModal(true)}
                />
              </div>
            </Content>
            <Content className="ant-layout-content_extend-property">
              <h2 className="property-title">属性</h2>
              {this.state.allComponent.length > 0
                ? <>
                  <HOCButton
                    className="delete-button"
                    size="small"
                    icon="delete"
                    text="删除元素"
                    onClick={this.onDeleteCurrentComponent}
                  />
                  <HOCButton
                    className="move-button"
                    size="small"
                    icon="up"
                    text="上移元素"
                    onClick={() => this.onMoveCurrentComponent('up')}
                  />
                  <HOCButton
                    className="move-button"
                    size="small"
                    icon="down"
                    text="下移元素"
                    onClick={() => this.onMoveCurrentComponent('down')}
                  />
                </>
                : null
              }
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

export default Page;
