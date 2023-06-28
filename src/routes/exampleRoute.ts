import express from 'express';
import exampleController from '../controllers/exampleController';
import validate from '../validate';
import exampleSchema from '../schema/exampleSchema';

const router = express.Router();

router.get('/example',
  validate.roles(exampleSchema.nameDto),
  exampleController.getExample);

export default router;