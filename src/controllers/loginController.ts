import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import userService from "../services/userService";
import { UserDto } from "../Dto/userDto";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  // 判断用户是否存在，不存在则创建
    const data1 = await userService.findOne(req.body);
    // 创建新用户
    if (data1.length === 0) {
      const pwd = bcrypt.hashSync(password, 10);
      const data2 = await userService.createUser({
        username,
        password: pwd,
        avatar: `https://api.multiavatar.com/${username}.png`,
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
          avatar: `https://api.multiavatar.com/${username}.png`,
        },
      });
    } else if (data1.length === 1) {
      data1?.forEach((item: any) => delete item.password);
      return res.json({
        success: true,
        message: '',
        error: {},
        data: data1,
      });
    } else {
      throw new Error('查询出错');
    }
};

export default {
  login,
};