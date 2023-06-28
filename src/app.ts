import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import exampleRoute from './routes/exampleRoute';
import errorMiddleware from './middlewares/errorMiddleware';
import HTTPException from './exceptions/HttpException';

const app: express.Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
// 解析 JSON 格式的请求体数据
app.use(express.json());
// 解析 URL 编码格式的请求体数据
app.use(express.urlencoded({extended: true}));

// 先跑起来
app.get('/', (req, res) => {
  res.send('This is Instant-messaging-Express');
});

app.use('/api', exampleRoute);

app.use((_req, res, next) => {
  const error: HTTPException = new HTTPException(404, '路由未分配');
  next(error);
});

// 错误中间件
app.use(errorMiddleware);

app.listen(9090, () => {
  console.log('Instant-messaging-Express is running...');
});