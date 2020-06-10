const User = require('../model/user');
const Post = require('../model/post');
const Comment = require('../model/comment');
const friend  = require('../model/friendship');
const Like = require('../model/like');
const fs = require('fs');
const path = require('path');
module.exports.profile = async function(req,res)
{
    let user = await User.findById(req.params.id);
    let posts = await Post.find({'user':req.params.id})
    .sort('-createdAt')
    .populate('user')
    // populate the user for each comment
    .populate({
        path: 'comments',
        populate: {
            path: 'user likes'
        }
    }).populate('likes');

    let friends = await friend.findOne({to_user:req.params.id,from_user:req.user.id});
    let check  = false;
    if(friends){
        check = true;
    }
    return res.render('user_profile' , {
            title: 'Users Profile',
            profile_user: user,
            posts: posts,
            check:check
    });
}

module.exports.update = async function(req,res){
    
    if(req.user.id == req.params.id)
    {
        try
        {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res, function(err){
                if(err)
                {
                    console.log('******Multer Error******',err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file)
                {   
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar)); 
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath +'/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err)
        {
            req.flash('error', err);
            return res.redirect('back');
        }

    }
    else{
        req.flash('error', 'Uauthorized');
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
    console.log('email',req.body.email);
    // TODO Later
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){

    req.logout();
    req.flash('success','Logged out Successfully');

    return res.redirect('/'); 
}