const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../model/user');


let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.CONNECTUS_JWT_SECRET
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){
    User.findById(jwtPayload._id, function(err,user){
        if(err)
        {
            console.log("Error in finding the user", err);
            return;
        }
        if(user)
        {
            return done(null, user);
        }
        else{
            return done(null, false);
        }

    })
}));

module.exports = passport;
