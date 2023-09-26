const express = require('express')
const app = express()

app.use(express.static('public'))

const bodyParser = require('body-parser')
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'jade')

app.locals.pretty = true

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jsh13579',
  database: 'sample',
})
connection.connect()

app.listen(8080, function () {
  console.log('server on 8080')
})

const date = new Date()

const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 1)).slice(-2)
const day = ('0' + date.getDate()).slice(-2)
const dateStr = year + '-' + month + '-' + day
app.get('/topic/form', function (req, res) {
  let sql = 'SELECT id,title FROM topic_backup'
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
    res.render('form', { topics: rows })
  })
})

app.post('/form_receiver', function (req, res) {
  const title = req.body.title
  const description = req.body.description
  const author = req.body.author
  const created = dateStr
  let sql =
    'INSERT INTO topic_backup (title,description,created,author) VALUES(?,?,?,?)'

  connection.query(
    sql,
    [title, description, created, author],
    function (err, rows, fields) {
      if (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
      } else {
        res.redirect('/topic/' + rows.insertId)
      }
    }
  )
})
app.get('/topic/:id/edit', function (req, res) {
  let sql = 'SELECT id,title FROM topic_backup'
  connection.query(sql, function (err, rows, fileds) {
    let id = req.params.id
    if (id) {
      let sql = 'SELECT * FROM topic_backup WHERE id=?'
      connection.query(sql, [id], function (err, topic, fields) {
        if (err) {
          console.log(err)
          res.status(500).send('Internal Server Error')
        } else {
          res.render('edit', { topics: rows, topic: topic[0] })
        }
      })
    } else {
      console.log('There is no id')
      res.status(500).send('Internal SErvaer Error')
    }
  })
})

app.post('/topic/:id/edit', function (req, res) {
  const title = req.body.title
  const description = req.body.description
  const author = req.body.author
  const id = req.params.id
  let sql = 'UPDATE topic_backup SET title=?, description=?,author=? WHERE id=?'
  connection.query(
    sql,
    [title, description, author, id],
    function (err, rows, fields) {
      if (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
      } else {
        res.redirect('/topic/' + id)
      }
    }
  )
})
app.get('/topic/:id/del', function (req, res) {
  let sql = 'SELECT id,title FROM topic_backup'
  let id = req.params.id
  connection.query(sql, function (err, rows, fields) {
    let sql = 'SELECT * FROM topic_backup WHERE id=?'
    connection.query(sql, [id], function (err, topic) {
      if (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
      } else {
        if (topic.length === 0) {
          console.log('There is no id')
          res.status(500).send('Internal Server Error')
        } else {
          res.render('del', { topics: rows, topic: topic[0] })
        }
      }
    })
  })
})

app.post('/topic/:id/del', function (req, res) {
  let id = req.params.id
  let sql = 'DELETE FROM topic_backup WHERE id=?'
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    } else {
      res.redirect('/topic')
    }
  })
})

app.get(['/topic', '/topic/:id'], function (req, res) {
  let sql = 'SELECT id,title FROM topic_backup'

  connection.query(sql, function (err, rows, fields) {
    let id = req.params.id
    if (id) {
      let sql = 'SELECT * FROM topic_backup WHERE id=?'
      connection.query(sql, [id], function (err, topic, fields) {
        if (err) {
          console.log(err)
          res.status(500).send('Internal Server Error')
        } else {
          res.render('view', { topics: rows, topic: topic[0] })
        }
      })
    } else {
      res.render('view', { topics: rows })
    }
  })
})
