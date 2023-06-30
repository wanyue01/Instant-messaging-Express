import Joi from 'joi';

const UserDto = {
  username: Joi.string().min(1).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
};

export default {
  UserDto,
};