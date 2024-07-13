
const User = require("../models/users")
const {setUser} = require("../utils/auth")

const userSignup = async(req, res) => {
    const{name, password, email} = req.body;
    await User.create({
        name,
        password,
        email
    });
    return res.render("home")
}

const userLogin = async (req, res) => {
  const{email, password} = req.body;
  const user = await User.findOne({
    email, 
    password,
});

if(!user){
 return res.render("login", {
   error: "Invaild User."
 });
}


const token = setUser(user)
res.cookie("uid", token)

return res.redirect("/")
}

module.exports = {
    userSignup,
    userLogin,
};