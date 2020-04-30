const Post = require('../model/post');
const User = require('../model/user');
module.exports.home = function(req,res)
{
    
    Post.find({}, function(req, posts){

    
    });
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){

        User.find({},function(err,users){

            return res.render('home' , {
                title: "Connect-Us | Home",
                posts : posts,
                all_users: users
            });
        });
    });
}

//  module.exports.actionName = function(req,res){}