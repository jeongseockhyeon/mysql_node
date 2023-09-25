const mysql = require('node-mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jsh13579',
  database: 'test',
})
connection.connect()
