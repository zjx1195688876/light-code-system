
import { Application } from 'egg';
export default (app: Application) => {
  app.get('/', app.controller.index.index);
};
