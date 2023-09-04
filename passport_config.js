const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");



function initialize (passport) {

    //function for the authentication process starts here;
    const authenticateUsers = async (email, passsword, done) => {

        // Getting users by their email
        const user = getUsersByEmail("email");
            if (user == null) {
                return done(null, false, {message: "Sorry no user has been found with that email on our end."});
            }


        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
                
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }

    passport.use(new localStrategy({
        usernameField: "email"
    }));

    passport.serializeUser(( user, done => {} ));
    passport.deserializeUser(( id, done => {} ));
}

module.exports(initialize);