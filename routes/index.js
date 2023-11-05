var express = require('express');
var router = express.Router();
var userModel = require('./users');
// const users = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');


/* GET home page. */
passport.use(new localStrategy(userModel.authenticate()))

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/profile',isLoggedIn,async function(req, res, next) {
  let users= await userModel.find()
  res.render('users',{users});
});
router.post('/register', function(req, res, next) {
  const userdets = new userModel({
    username : req.body.username,
    picture: req.body.picture,
    email : req.body.email,
  });
  userModel.register(userdets, req.body.password)
  .then(function(user){
    passport.authenticate("local")(req,res, function(){
      res.redirect("/");
    })
  })
});
router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/",
}),function(req,res,next){})

router.get("/logout",function(req,res,next){
  req.logout(function(err){
  if(err){return next(err);}
  res.redirect('/')
 });
});
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect("/")
  }
}

router.get('/users', async function(req, res, next){
  const users =await userModel.find()
  res.render('users',{users});
})

router.get('/likes/:username', isLoggedIn, async function(req, res) {
  let liked = await userModel.findOne({username: req.session.passport.user});
  liked.likes.push()
  await liked.save()
  res.redirect('/users');
})
// router.get('/update', async function(req, res){
//   const updateusers =await userModel.findOneAndUpdate( {username: 'mohit'},{
//     email: "chintu@gamail.com"
//   })
//   res.send(updateusers)
// })
// router.get('/delete', async function(req, res){
//   const deleteusers =await userModel.findOneAndDelete( {username: 'tarun'})
//   res.send("hogya")
// })


module.exports = router;  
