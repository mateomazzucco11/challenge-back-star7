const jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyToken(req, res, next) {
  const {accesstoken} = req.headers;
  
  jwt.verify(accesstoken, process.env.ACCESS_TOKEN, (err, resp) => {
    if (err) {
      return res
        .status(500)
        .json({
          msg: 'The token does not exist'
        })
    }
    
    next();
  })
}

module.exports = verifyToken;