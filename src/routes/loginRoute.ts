import express from 'express';
import loginController from '../controllers/loginController';
import validate from '../validate';
import userSchema from '../schema/userSchema';
import { wrapAsync } from '../utils/wrapAsync';

const router = express.Router();

router.post('/login',
  validate.roles(userSchema.UserDto, undefined, 'body'),
  wrapAsync(loginController.login));

export default router;