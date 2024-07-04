const User = require("../models/users")

const userSignup = async(req, res) => {
    const{name, password, email} = req.body;
    await User.create({
        name,
        password,
        email
    });
    return res.redirect("/")
}

const userLogin = async (req, res) => {
  const{email, password} = req.body;
  const userFound = await User.findOne({
    email, 
    password,
});

if(!userFound){
 return res.render("login", {
   error: "Invaild User."
 });
}
return res.redirect("/")
}

module.exports = {
    userSignup,
    userLogin,
};