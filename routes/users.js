
const mongoose =  require("mongoose");
const passport =require('passport');
const plm = require('passport-local-mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/dbconnectname");

const userSchema = mongoose.Schema({
  username : String,
  password: String,
  picture: String,
  email : String,
  likes: {
    type: Array,
    default: []
  }
})
userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);