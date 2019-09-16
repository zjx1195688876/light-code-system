import React from 'react';
import './index.css';
import COMPONENTS_GENERATE_FUNCTION from '../../config/constant';

class LayoutTest extends React.Component {
  constructor(props) {
    super(props);
    console.log('props: ', props);
    this.state = {
      section1: {
        string: '',
        eleemnt: {},
      },
      section2: {
        string: '',
        eleemnt: {},
      },
    };
  }

  // 核心：数据流的管理
  addCopmponent = e => {
    const id = e.currentTarget.dataset.id;
    let config = {};
    if (id === 'section_1') {
      config = {
        text: '按钮文字',
        type: 'primary',
      };
      const { string, element } = COMPONENTS_GENERATE_FUNCTION('button')(config);
      this.setState({
        section1: {
          string,
          element,
        },
      });
      console.log('string: ', string);
    }
  }

  render() {
    return (
      <>
        {/* 代码生成区和预览区 开始 */}
        <div className="section" data-id="section_1" onClick={this.addCopmponent}>
          {this.state.section1.element}
        </div>
        <div className="section" data-id="section_2" onClick={this.addCopmponent}>
          {/* <!-- layout-slot --> */}
        </div>
        {/* 代码生成区和预览区 结束 */}
      </>
    );
  }
}

export default LayoutTest;
