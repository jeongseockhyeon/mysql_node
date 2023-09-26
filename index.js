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
app.get('/topic/form', function (req, res) {
  fs.readdir('data', function (err, files) {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    } else {
      res.render('form', { topics: files })
    }
  })
})

app.post('/form_receiver', function (req, res) {
  const title = req.body.title
  const des = req.body.des
  fs.writeFile('data/' + title, des, function (err) {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    } else {
      res.redirect('/topic/' + title)
    }
  })
})

app.get(['/topic', '/topic/:id'], function (req, res) {
  let sql = 'SELECT id,title FROM topic'

  connection.query(sql, function (err, rows, fields) {
    res.render('view', { topics: rows })
  })
  /*
  fs.readdir('data', function (err, files) {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    } else {
      const id = req.params.id
      if (id) {
        // id 값이 존재
        fs.readFile('data/' + id, 'utf8', function (err, data) {
          if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error')
          } else {
            res.render('view', { topics: files, title: id, des: data })
          }
        })
      } else {
        // id값이 없음
        res.render('view', { topics: files, title: 'Hello', des: 'world' })
      }
    }
  })
  */
})
