import mysql from 'mysql';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'instant_message',
});

export default db;