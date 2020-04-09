const User = require('../model/user');

module.exports.profile = function(req,res){

    // res.end('<h1>User Profile</h1>');
    return res.render('user_profile' , {
        title: 'Users'

    });
    
}

// renders the signup page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up',{
        title: "ConnectUs | Sign Up"
    })
}

// renders the signin page
module.exports.signIn = function(req, res){

    return res.render('user_sign_in',{
        title: "ConnectUs | Sign In"
    })
}


// get signup data

module.exports.create = function(req, res){

    if(req.body.password != req.body.confirm_password)
        {
            return res.redirect('back');
        }

    User.findOne({email: req.body.email}, function(err, user){


        if(err){
            console.log('Error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}

// signin and create a session for user
module.exports.createSession = function(req, res){

    // TODO Later
}