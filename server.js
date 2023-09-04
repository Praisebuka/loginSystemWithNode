if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


// Importing preinstalled libraries
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport_config");
const flashmessage = require("express-flash");
const  session = require("express-session");
const port = process.env.PORT ||3000;
app.set('view engine', 'ejs');


// Using the email to verify incoming users on the login screen
initializePassport( passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    );

const users = [];

app.use(express.urlencoded({ extended : false}));
app.use(flashmessage());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false, // this line makes the session variable not to save if it wasn't changed
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configuring the  post method for the registration page
app.post('/register', checkNotAuthUsers, async (req, res) => {
    // running try catch to validate users

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // Show newly created users in my console using
        console.log(users);

        // and then it redirects a user on successfully login.
        res.redirect("/login");

    } catch (error) {
        console.log(error);
        res.redirect("/register");
    }
});


// Configuring the  post method for the login page
app.post('/login', checkNotAuthUsers, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login", 
    failureFlash: true
}));

// define required routes starts
app.get('/', checkAuthUsers, (req, res) => {
    res.render("index.ejs", {name: req.user.name});
});

app.get('/register', checkNotAuthUsers, (req, res) => {
    res.render("register.ejs");
});

app.get('/login', checkNotAuthUsers, (req, res) => {
    res.render("login.ejs");
});
// define required routes ends

// Making fallback routes for the application
function checkAuthUsers(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  
    } 
    res.redirect("/login");
}

function checkNotAuthUsers(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    } next();
}

// configuring server
app.listen(port, ()=>{
    console.log( "Your application is running on http://localhost:3000")
});
