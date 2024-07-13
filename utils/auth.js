const jwt = require("jsonwebtoken")
const secret = "jatin$123";
const User = require("../models/users")

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret)
}

const getUser = async (token) => {
   if(!token) return null;
    return jwt.verify(token, secret);
  };

module.exports = {
    setUser,
    getUser,
}