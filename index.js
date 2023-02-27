const express = require("express");
require("dotenv").config();
const db = require("./config/mongoose");
const app = express();
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// for permanently store session cookies to db
const MongoStore = require("connect-mongo");

const port = 8000;

// set ejs as view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "placement_cell",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.DATABASE_PASS}@cluster0.lymyd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "MongoStore connnection setup ok");
      }
    ),
  })
);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(express.urlencoded({ extended: true }));

// for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// express router
app.use("/", require("./routes"));

// listen on port
app.listen(port, (error) => {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  console.log(`Server running on port: ${port}`);
});
