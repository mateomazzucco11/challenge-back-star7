const express = require('express');
const app = express();
const dataBase = require('../../db/connect');
const verifyToken = require('../../middleware/verifyToken');

app.get('/clients', verifyToken, (req, res) => {
  dataBase.query('SELECT id, email, name, city FROM clients WHERE del = ?', ['false'], (err,result) => {
    if(err){
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
          err: err
        });
    }
    if(result.length === 0) {
      return res
        .status(400)
        .json({
          msg: 'No customers',
        });
    };

    return res
      .status(200)
      .send(result)
  });
});

app.post('/clients', verifyToken, (req,res) => {
  const { email, name, city } = req.body;

  dataBase.query('INSERT INTO clients SET email = ?, name = ?, city = ?', [email, name, city], (err, result) => {
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
          msg:'Clients added successfully',
          
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be added',
        });
    };
  });
});

app.put('/clients/:id', verifyToken, (req, res) => {
  const { email, name, city } = req.body;
  const { id } = req.params;

  console.log(email, name, city, id)

  dataBase.query('UPDATE clients SET email = ?, name = ?, city = ? WHERE id = ?', [email, name, city, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
          err: err
        });
    };

    if(result.changedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Edited successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be edited',
        });
    };
  });
});

app.delete('/clients/:id', verifyToken, (req,res) => {
  const { id } = req.params;

  dataBase.query('UPDATE clients SET del = ? WHERE id = ?', ['true', id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'There was a problem on the server',
          err: err,
        })
    }

    if(result.changedRows > 0) {
      return res
        .status(200)
        .json({
          msg:'Delete successfully',
        });
    } else {
      return res
        .status(400)
        .json({
          msg: 'Could not be removed',
        });
    };
  });
});

module.exports = app;