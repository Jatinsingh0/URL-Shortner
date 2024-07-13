const { getUser } = require("../utils/auth");

const restrictUser = async (req, res, next) => {
  try {
    const userUid = req.cookies?.uid;

    if (!userUid) {
      console.log("User UID not found in cookies, redirecting to login.");
      return res.redirect("/login");
    }

    const user = await getUser(userUid);

    if (!user) {
      console.log("User not found, redirecting to login.");
      return res.redirect("/signup");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in restrictUser middleware:", error);
    res.status(500).send("Internal Server Error");
  }
};

async function checkAuth(req, res, next) {
  try {
    const userUid = req.cookies?.uid;

    if (!userUid) {
      console.log("User UID not found in cookies.");
      req.user = null;
      return next();
    }

    const user = await getUser(userUid);

    if (!user) {
      console.log("User not found.");
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in checkAuth middleware:", error);
    req.user = null;
    next();
  }
}

module.exports = {
  restrictUser,
  checkAuth,
};
