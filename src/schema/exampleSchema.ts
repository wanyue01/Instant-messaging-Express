import Joi from 'joi';

const nameDto = {
  name: Joi.string().min(5).max(12).required().error(Error('name必填')),
};

export default {
  nameDto,
}