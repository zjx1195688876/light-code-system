'use strict';
// https://www.yuque.com/easy-team/egg-react/config
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);
module.exports = {
  entry: {
    index: 'app/web/page/index/index.tsx'
  },
  alias: {
    '@': resolve('app/web')
  },
  module: {
    rules: [
      {
        less: {
          include: [resolve('app/web'), resolve('node_modules')],
          options: {
            javascriptEnabled: true,
            modifyVars: {
              'primary-color': '#1890ff',
              'link-color': '#1DA57A',
              'border-radius-base': '2px'
            }
          }
        }
      }, 
      {
        typescript: true
      }
    ],
  }
};