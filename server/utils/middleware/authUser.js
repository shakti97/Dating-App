const jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  // console.log("header",req.headers);
  let token = req.headers['authtoken'] || req.headers['authorization'];
  // console.log('tpooken',token);
  if (token.startsWith('Bearer')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports= checkToken;