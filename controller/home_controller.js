const Post = require('../model/post');
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
        return res.render('home' , {
            title: "Connect-Us | Home",
            posts : posts
        });

    }) 
    
   
}

//  module.exports.actionName = function(req,res){}