import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import userService from "../services/userService";
import { UserDto } from "../Dto/userDto";
import HTTPException from "../exceptions/HttpException";
import jwt from 'jsonwebtoken';
import config from "../config";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const avatar = `https://api.multiavatar.com/${username}.png`;
  // 判断用户是否存在，不存在则创建
  const data1 = await userService.findOne(req.body);
  // 创建新用户
  if (data1.length === 0) {
    const pwd = bcrypt.hashSync(password, 10);
    const data2 = await userService.createUser({
      username,
      password: pwd,
      avatar,
    });
    if (data2.affectedRows !== 1) {
      throw new Error('注册失败');
    }
    return res.json({
      success: true,
      message: '',
      error: {},
      data: {
        username,
        avatar,
        token: getToken({ username, avatar }),
      },
    });
  } else if (data1.length === 1) {
    // 比较密码是否一致
    const flag = bcrypt.compareSync(password, data1[0].password);
    if (!flag) {
      throw new HTTPException(200, '用户名或密码出错');
    }
    data1?.forEach((item: any) => {
      delete item.password;
      item.token = getToken({ username, avatar });
    });
    return res.json({
      success: true,
      message: '',
      error: {},
      data: data1[0],
    });
  } else {
    throw new Error('查询出错');
  }
};

const getToken = (data: any) => {
  return jwt.sign(
    data, config.jwtSecretKey,
    { expiresIn: config.expiresIn, algorithm: 'HS256' }
  );
}

export default {
  login,
};