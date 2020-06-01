const passport = require('passport');
const githubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../model/user');
// const env = require('./environment');

passport.use(new githubStrategy({
    clientID: "1b48631ffdbf833b865f",
    clientSecret: "5187921a292f9870e40366c0487cfad477b52194",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {

    User.findOne({ email: profile._json.email }).exec(function (err, user) {
        if(err)
        {
            console.log('Error in github-strategy-passport',err);
            return;
        }
    

        if(user)
        // if found, set this user as req.useyesy r
        {
            return done(null, user);
        }
        else{
            // if not found, create a user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile._json.email,
                password: crypto.randomBytes(20).toString('hex')
            },function(err, user){
                if(err)
                {
                    console.log("Error in creating user github-strategy-passport",err);
                    return;
                }
                return done(null,user);
            })
        }
    })
  }
  ));


  module.exports = passport;