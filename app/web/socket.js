import io from 'socket.io-client';

const socket = io('http://172.18.244.27:7001/', {
  reconnectionAttempts: 3,
  transports: ['websocket'],
});
const originalEmit = socket.emit.bind(socket);

socket.on('error', error => {
  console.error(error);
});

socket.emit = function emit(...args) {
  return new Promise((resolve, reject) => {
    if (!args[1]) {
      args.push({});
    }

    args.push((error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });

    originalEmit(...args);
  });
};

export default socket;
