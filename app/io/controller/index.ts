const Controller = require('egg').Controller;

class IndexController extends Controller {
  public async getWorkFolder() {
    console.log(111);
    await console.log('socke getWorkFolder');
  }
};

module.exports = IndexController;
