var express = require('express');
var router = express.Router();
var User = require('../models/user');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

router.post('/api/login', function(req, res, next){
  if (req.body.logemail && req.body.logpassword) {
    //username and password present
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {

        res.json({ success: false, message: 'Wrong email or password', user : null});
      } else {
        req.session.userId = user._id;

        res.json({ 
          success: true, 
          message: 'Successfully logged in', 
          user : {
            id : user._id, 
            email : user.email
          }
        });
      }
    });
  } else {

    res.json({ success: false, message: 'All fields required', user : null});

  }

  return router;///
})


//POST route for updating data
router.post('/api/register', function (req, res, next) { //was just '/'
  if (req.body.email && req.body.password) {

    var userData = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData, function (error, user) {
      if (error) {
        res.json({ 
          success: false, 
          message: 'Email already registered', 
          user : null
        });
      } else {
        req.session.userId = user._id;

        res.json({ 
          success: true, 
          message: 'Successfully registered', 
          user : null
        });
      }
    });

  } else {
    res.json({ 
      success: false, 
      message: 'All fields required', 
      user : null
    });
  }

  return router;
})

function requiresLogin(req, res, next) {/////////// remove/replace?
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

router.post('/api/verify-auth', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          return res.send(user);
        } else {
          return res.send({
            id : user._id, 
            email : user.email
          });
        }
      }
    });
});

// GET for logout logout
router.post('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.send("success");
      }
    });
  }
});

module.exports = router;
