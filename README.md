# Instant-messaging-Express(基于Express的即时通信后端代码)
- 😊写这个的目的主要是之前软工课设时这个功能没有完全实现，算是弥补遗憾吧
- 😊希望能给有需要的人一点帮助，共同进步！

### 记录神坑
#### 😒express就算写了错误级别中间件也不能直接捕获异步的错误
- 处理方法：利用中间件的原理，往next中传递错误
  ```typescript
  // 封装async
  function wrapAsync(fn) {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  }

  // 使用
  app.use('/example', wrapAsync(async (req, res) => {
    await new Promise(resolve => setTimeout(() => resolve(), 50));
    // Async error!
    throw new Error('woops');
  }));