const express = require('express');
const dataBase = require('../../db/connect');
const app = express();

app.post('/register', (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res
      .json({
        msg: 'There is no email or password',
      })
      .status(400)
  }

  dataBase.query('INSERT INTO users SET email = ?, password = ?', [email, password], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
          err: err
        });
    };

    if(result.affectedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'User created successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be created',
        });
    };
  })
});

module.exports = app;