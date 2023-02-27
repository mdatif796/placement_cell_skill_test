const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/userSchema");

// using passport middleware
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // find the user using this email passed
        let user = await User.findOne({ email: email });
        console.log("user: ", user);
        // if user not found or password doesn't match
        if (!user || !user.isPasswordCorrect(password)) {
          console.log("Invalid username/password");
          // report to the passport that user doesn't exist
          return done(null, false);
        }

        // if user found
        if (user) {
          // report back to the passport that user exist and sends that user to passport
          return done(null, user);
        }
      } catch (err) {
        console.log("Error in finding the user --> passport");
        return done(err);
      }
    }
  )
);

// serializing the user to kept user id as a key in cookies
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// deserializing the user to find the user using that key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    // find the user using that id present in the cookies
    let user = await User.findById(id);
    // if the user found then pass that user to the passport
    return done(null, user);
  } catch (err) {
    console.log("Error", err);
    return done(err);
  }
});

// check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if the user is signed in
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/signin");
};

// set authenticated user for views
passport.setAuthenticatedUser = (req, res, next) => {
  // if the user is signed in then
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookies and we are just sending it to the locals for the views

    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
