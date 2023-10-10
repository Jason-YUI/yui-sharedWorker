const uuids = [];
const ports = [];

self.onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);

  // 获取页面标识
  const uuid = Math.random().toString(36).substr(2);
  uuids.push(uuid);
  port.postMessage({
    type: 'connect',
    uuid: uuid
  });

  // 监听消息
  port.onmessage = (e) => {
    const index = ports.indexOf(port);
    const uuid = uuids[index];

    // 群发消息
    broadcast({
      type: 'message',
      sender: uuid,
      message: e.data.message
    });
  };
};

// 群发消息
const broadcast = (data) => {
  ports.forEach((port) => {
    port.postMessage(data);
  });
}
