var express = require('express');
var router = express.Router();
var monk = require('monk');
var Cryptr = require('cryptr');
var crypt = new Cryptr('myTotalySecretKey');
var db = monk('localhost:27017/ownpage_db');
var signlogdata = db.get('signlogdata');
var tododata = db.get('tododata');

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('pandalog');
// });

router.get('/home', function(req,res){
  res.render('home');
});

router.get('/forgot', function(req,res){
  res.render('forgot');
});

// -------------------------------------------------------------------end of signup login and forgot--------------------------------------------------------------------------//

router.get('/',function(req,res){
  // req.session.reset();
  res.render('home');
});

router.get('/index', function(req,res){
  res.render('index');
});

router.get('/resume',function(req,res){
  res.render('resume');
});

router.get('/logout',function(req,res){
  // req.session.reset();
  res.redirect('/');
});

router.get('/products', function(req,res){
  res.render('products');
});

router.get('/product-page', function(req,res){
  res.render('product-page');
});

router.get('/checkout', function(req,res){
  res.render('checkout');
});

router.post('/postsignup',function(req,res){
  var signdata=
  {
    mail: req.body.mail,
    pwd : crypt.encrypt(req.body.pwd) //pwd length must b of 16 chars else it returns error IV while decrypting pwd
  }
  signlogdata.insert(signdata,function(err,data){
    if(err){
      console.log(err);
    }
    else{
      console.log("success");
      res.send(data);
    }
  });
});

router.post('/postlogin', function(req,res){
  var mail = req.body.mail;
  signlogdata.find({'mail':req.body.mail},function(err,data){
  var password1 = crypt.decrypt(data[0].pwd);
  var password2 = req.body.pwd;
  console.log(password1==password2);
  if(password1==password2)
  {
    res.sendStatus(200);
    // res.send(data);
  }
  else{
    res.sendStatus(500);
  }
  })
});

router.post('/postforgot', function(req,res){
  var mail = req.body.mail;
  var newpassword = randomstring.generate(7);
  signlogdata.update({"mail":mail},{$set:{"password":newpassword}});
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'edifakemail0@gmail.com',
    pass: 'allisfake'
  }
  });

  var mailOptions = {
    from: 'bhargavaGidijala',
    to: mail,
    subject: 'OTP',
    text: 'Your OTP is'+newpassword
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent');
      res.send(info);
    }
  });
});

router.get('/gettasks', function(req, res) {
  tododata.find({}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  })
});

router.post('/posttasks', function(req,res){
  var posting =
  { 
    taskname:req.body.taskname,
    status:'Incomplete'
  }
  tododata.insert(posting, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  })
});

router.delete('/deletetasks1/:id', function(req,res){
  //console.log(req.params.id)
  tododata.remove({"_id":req.params.id}, function(err,docs){
    if(err){
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  });
});

router.put('/edituser/:a', function(req,res){
  console.log(req.params.a);
  console.log(req.body);
  tododata.update({"_id":req.params.a},{$set:req.body}, function(err,docs){
    if (err) {
      console.log(err);
    }
    else{
      //console.log(docs);
      res.send(docs);
    }
  });
});

// router.post('/movetask/:b', function(req,res){
//   tododata.update({"_id":req.params},{$set:{"status":"Completed"}}, function(err,docs){
//     if (err) {
//       console.log(err);
//     }
//     else{
//       //console.log(docs);
//       res.send(docs);
//     }
//   });
// });


module.exports = router;
