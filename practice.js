const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jsh13579',
  database: 'sample',
})
connection.connect()
/*
//topic 테이블 조회
connection.query('SELECT * FROM topic', function (err, rows, fields) {
  //에러 발생 시 에러 출력
  if (err) {
    console.log(err)
  } else {
    for (var i = 0; i < rows.length; i++) {
      console.log(rows[i].title)
    }
  }
})
connection.end()
*/
/*
//테이블 정보 추가
let params = ['node.js', 'node.js is ...', '2023-09-26', '2'] //인자 순서 대로 매칭
connection.query(
  'INSERT INTO topic (title, description, created,author_id) VALUES(?,?,?,?)',
  params,
  function (err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      console.log(rows.insertId)
    }
  }
)
connection.end()
*/
/*
//테이블 정보 수정
let params = ['Node.js', 'Node.js is ...', 8]
connection.query(
  'UPDATE topic SET title=?, description=? WHERE id=?',
  params,
  function (err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      console.log(rows)
    }
  }
)
*/
/*
let params = [7]
connection.query(
  'DELETE FROM topic WHERE id = ?',
  params,
  function (err, rows, fields) {
    if (err) {
      console.log(err)
    } else {
      console.log(rows)
    }
  }
)
*/
