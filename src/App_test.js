import React from 'react';
import Header from './components/header/index';
// import SideBar from './components/side-bar/index';
import './App.css';

// const SideBarList = [
//   {
//     key: 'ui-component',
//     title: 'UI组件',
//     list: [
//       {
//         id: 1,
//         name: 'UI组件1'
//       },
//       {
//         id: 2,
//         name: 'UI组件2'
//       }
//     ]
//   },
//   {
//     key: 'business-component',
//     title: '业务组件',
//     list: [
//       {
//         id: 3,
//         name: '业务组件1'
//       },
//       {
//         id: 4,
//         name: '业务组件2'
//       }
//     ]
//   }
// ];

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    
  }

  selectCopmponent = e => {
    console.log('key: ', e.currentTarget.dataset.key);
  }
  
  addCopmponent = e => {
    console.log('id: ', e.currentTarget.dataset.id);
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
            <div className="section" data-id="main_1" onClick={this.addCopmponent}>
              {/* <!-- layout-slot --> */}
            </div>
            <div className="section" data-id="main_2" onClick={this.addCopmponent}>
              {/* <!-- layout-slot --> */}
            </div>
            {/* 代码生成区和预览区 结束 */}
          </div>
          <div className="property">
            <h2 className="property-title">属性</h2>
            <div></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
