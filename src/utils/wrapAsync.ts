import { Request, Response, NextFunction } from "express";

export function wrapAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch(next);
  };
};