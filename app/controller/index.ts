import { Controller } from 'egg';
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    await ctx.render('index.js', {
      title: '轻量级代码生成平台',
      keywords: 'react, server side render, ant design',
      message: { text: 'Ant Design Tab Theme and Code Spliting' }
    });
  }
}