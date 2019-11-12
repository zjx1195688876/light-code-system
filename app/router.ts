
import { Application } from 'midway-mirror';

export default (app: Application) => {
  const { router, io } = app;

  // 主页渲染
  router.get('/', app.controller.index.index);

  // socket.io
  const routers: [string, () => {}][] = [
    ['io.index.getWorkFolder',  io.controller.index.getWorkFolder],
  ];

  routers.forEach(([eventName, handle]) => {
    app.io.route(eventName, async function(this: any) {
      const { args } = this;
      const params = args[0];
      const callback = args[args.length - 1];

      try {
        this.args = params;
        const data = await handle.call(this);
        console.info(eventName);
        callback(null, data);
      } catch (error) {
        console.error(error);
        callback({
          code: error.code,
          message: error.message,
        });
      }
    });
  });
};
