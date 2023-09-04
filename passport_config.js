const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");



function initialize (passport, getUsersByEmail, getUsersById) {

    //function for the authentication process starts here;
    const authenticateUsers = async (email, password, done) => {

        // Getting users by their email
        const user = getUsersByEmail(email);
            if (user == null) {
                return done(null, false, {message: "Sorry no user has been found with that email on our end."});
            }


        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password Incorrect"});
            }
                
        } catch (error) {  
            console.log(error);
            return done(error);
        } 
    }

    passport.use(new localStrategy({ usernameField: "email"}, authenticateUsers));
    passport.serializeUser(( user, done) =>  done(null, user.id));
    passport.deserializeUser(( id, done) => {
        return done(null, getUsersById(id));
    } );
}

// this was meant to be the format for this code "module.exports = initialize" but you know am an Idan🙂
module.exports = initialize;