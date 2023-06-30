import { MysqlError } from "mysql";
import db from "../db";

type r = {
  // error: MysqlError | null;
  result: any;
}
/**
 * @param {string} sql - sql语句
 * @param {any} args - sql语句中的参数
 * @param {Function} fn - 执行sql语句后的回调
 */
export function myQuery(
  sql: string,
  args?: any,
  fn?: () => void
): Promise<any> {
  // let error = null;
  let result;
  return new Promise((resolve, reject) => {
    db.query(sql, args, (err, res) => {
      // error = err;
      if (err) {
        reject(err);
      }
      result = res;
      // resolve({
      //   error,
      //   result,
      // });
      resolve(result);
    });
  })
};