const passport = require('passport');
const githubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../model/user');
const env = require('./environment');

passport.use(new githubStrategy({
    clientID: env.github_client_ID,
    clientSecret: env.github_client_Secret,
    callbackURL: env.github_callback_URL 
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