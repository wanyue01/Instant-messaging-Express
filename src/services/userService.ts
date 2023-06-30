import db from "../db";
import { UserDto } from "../Dto/userDto";
import { myQuery } from "../utils/handleSql";

const createUser = (user: UserDto) => {
  const sql = 'insert into users set ?';
  // let error, result;
  return myQuery(sql, user);
  // db.query(sql, user, (err, res) => {
  //   error = err;
  //   result = res;
  // });
  // return { error, result };
};

const findOne = (user: UserDto) => {
  const sql = 'select * from users where username=?';
  return myQuery(sql, user.username);
  // let error, result;
  // db.query(sql, user.username, (err, res) => {
  //   error = err;
  //   result = res;
  // });
  // return { error, result };
};

export default {
  createUser,
  findOne,
};