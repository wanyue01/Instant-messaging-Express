import { Request, Response } from 'express';
import exampleService from '../services/exampleService';

const getExample = (req: Request, res: Response) => {
  const {name} = req.query;
  const example = exampleService.getExample(name as string);
  res.json({example});
};

export default {
  getExample,
}