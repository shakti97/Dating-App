const express = require('express');
const router = express.Router();
const UserOperation = require('../database/UserOperations.js');
const checkToken=require('../utils/middleware/authUser.js');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
router.post('/register', (req, res) => {
    console.log('signUp app route');
    let userObject = req.body;
    UserOperation.UserSignUp(userObject, res);
});
router.post('/login', (req, res) => {
    // console.log('login');
    let userObject = req.body;
    // console.log('request headers ', req.headers);
    UserOperation.UserLogIn(userObject, req, res);
});
router.post('/uploadImage',multipartMiddleware,(req,res)=>{
    UserOperation.uploadImage(req,res);
})
router.get('/getUsers',checkToken,(req,res)=>{
    UserOperation.getUsers(req,res);
})
router.post('/blocked',checkToken,(req,res)=>{
    UserOperation.blockedUser(req,res);
})
router.post('/liked',checkToken,(req,res)=>{
    UserOperation.likedUser(req,res);
})
router.post('/superLiked',checkToken,(req,res)=>{
    UserOperation.superLikedUser(req,res);
})
router.get('/getBlockedUser',checkToken,(req,res)=>{
    UserOperation.getBlockedUser(req,res);
})

module.exports = router;