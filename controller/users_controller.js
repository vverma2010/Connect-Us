const User = require('../model/user');

module.exports.profile = async function(req,res)
{
    let user = await User.findById(req.params.id);
    return res.render('user_profile' , {
            title: 'Users Profile',
            profile_user: user
        });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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
    req.flash('success','Logged in Successfully');
    // TODO Later
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

    req.logout();
    req.flash('success','Logged out Successfully');

    return res.redirect('/'); 
}