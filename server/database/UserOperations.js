const userSchema = require("./schema/UserSchema");
const passwordHash = require("password-hash");
const uniqueString = require("unique-string");
const config = require("../utils/middleware/config.js");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const UserOperations = {
  UserSignUp(userObject, response) {
    // console.log("UserSingUp UserOperation"); 
    userObject.password = passwordHash.generate(userObject.password);
    // console.log(userObject);
    userSchema.create(userObject, (err, user) => {
      if (err) {
        console.log("Error in SignUp", err);
        response.status(503).send({
          Error: "Internal Server Error"
        });
      } else {
        console.log("details added to the db at ", user._id);
        response.status(200).json({
          isSignUp: true,
          userId: user._id
        });
      }
    });
  },
  UserLogIn(userObject, request, response) {
    // console.log("UserLogIn UserOperation");
    userSchema.find(
      {
        email: userObject.email
      },
      (err, userDoc) => {
        if (err) {
          // console.log("Error in fetching userId ", err);
          response.status(500).json({
            success: false,
            message: "Id is not registered"
          });
        } else if (userDoc && userDoc.length > 0) {
          // console.log("Email id exist lets check the password");
          let result = passwordHash.verify(
            userObject.password,
            userDoc[0].password
          );
          if (result) {
            let token = jwt.sign(
              { userEmail: userObject.email },
              config.secret,
              {
                expiresIn: "24h"
              }
            );
            response.json({
              success: true,
              message: "Authentication successful!",
              token: token
            });
          } else {
            response.status(403).json({
              success: false,
              message: "Incorrect username or password"
            });
          }
        }
      }
    );
  },
  uploadImage(req, res) {
    // console.log(req);
    cloudinary.v2.uploader.upload(req.files.image.path, {}, function(
      error,
      result
    ) {
      if (error) {
        return res.status(500).send(error);
      }
      // console.log("result",result);
      res.json({
        imageUrl: result.url
      });
    });
  },
  getUsers(req, res) {
    // console.log("decodec: ", req.decoded);
    userSchema.find(
      { email :  { $ne  : req.decoded.userEmail}},{name : 1,email : 1,imageUrl : 1},
      (err, users) => {
        if (err) {
          res.send(500).json({
            success: false,
            message: "Internal Server Error"
          });
        }
        // console.log(users);
        res.json({
          success: true,
          message: "Successfuly Retrived Users ",
          userList: users
        });
      }
    );
  },
  getBlockedUser(req,res){
    // console.log('i m running');
    userSchema.find({
      email : req.decoded.userEmail
    },{blocked : 1},(err,data)=>{
      if(err){
        res.send(500).json({
          success : false,
          message : 'Internal Server Error'
        })
      }
      // console.log(data);
      res.json({
        success : true,
        message : 'Successfully fetched blocked user Array',
        blockedArray : data[0]
      })
    })
  },
  blockedUser(data, callback) {
    userSchema.findOneAndUpdate(
      {
        email: data.currentEmail
      },
      {
        $push: {
          blocked: data.targetEmail
        }
      },
      err => {
        if (err) {
          console.log('Error in Blocked Db request');
          return;
          // res.send(500).json({
          //   success: false,
          //   message: "Internal Server Error"
          // });
        }
        callback(data);
      }
    );
  },
  likedUser(data, callback) {
    console.log('liked',data);
    console.log('data.targetEmail', data);
    let currentEmail=data.currentEmail;
    let targetEmail=data.targetEmail;
    userSchema.findOneAndUpdate(
      {
        email: currentEmail
      },
      {
        $push: {
          liked: targetEmail
        }
      },
      (err,doc) => {
        if (err) {
          console.log(err);
          return;
          // res.send(500).json({
          //   success: false,
          //   message: "Internal Server Error"
          // });
        }
        callback();
      }
    );
  },
  superLikedUser(data,callback) {
    userSchema.findOneAndUpdate(
      {
        email: data.currentEmail
      },
      {
        $push: {
          superLiked: data.targetEmail
        }
      },
      (err,doc) => {
        if (err) {
          console.log('Error in super Liked Db Request');
          return;
          // res.send(500).json({
          //   success: false,
          //   message: "Internal Server Error"
          // });
        }
        console.log('doc',doc);
        callback(doc);
      }
    );
  }
};
module.exports = UserOperations;
