import express from 'express';

const app: express.Application = express();

// 先跑起来
app.get('/', (req, res) => {
  res.send('This is Instant-messaging-Express');
});

app.listen(9090, () => {
  console.log('Instant-messaging-Express is running...');
});