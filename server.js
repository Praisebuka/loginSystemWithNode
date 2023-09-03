// Importing preinstalled libraries
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const port = process.env.PORT ||3000;
app.set('view engine', 'ejs');

const users = [];

app.use(express.urlencoded({ extended : false}));

app.post('/register', async (req, res) => {
    //  running try catch to validate users

    try {
        const hashedPassword = await bcrypt.hash(req.body.password);

    } catch (error) {
        
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
