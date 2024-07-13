
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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = setUser(user);
    res.cookie("token", token);
    res.json({ token });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

return res.redirect("/")
}

module.exports = {
    userSignup,
    userLogin,
};