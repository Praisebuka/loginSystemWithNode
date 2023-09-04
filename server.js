// Importing preinstalled libraries
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport_config");

initializePassport(passport);

const port = process.env.PORT ||3000;
app.set('view engine', 'ejs');

const users = [];

app.use(express.urlencoded({ extended : false}));

app.post('/register', async (req, res) => {
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



// define required routes starts
app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/register', (req, res) => {
    res.render("register.ejs");
});

app.get('/login', (req, res) => {
    res.render("login.ejs");
});
// define required routes ends



// configuring server
app.listen(port, ()=>{
    console.log( "Your application is running on http://localhost:3000")});
