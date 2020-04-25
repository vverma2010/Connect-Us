const Post = require('../model/post');
module.exports.home = function(req,res)
{
    // console.log(req.cookies);
    // res.cookie('user_id', 04 );
    // return res.end('<h1>express is up for ConnectUs</h1>');
    Post.find({}, function(req, posts){

        // return res.render('home' , {
        //     title: "Connect-Us | Home",
        //     posts : posts
        // });
    });
    // populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home' , {
            title: "Connect-Us | Home",
            posts : posts
        });

    }) 
    
   
}

//  module.exports.actionName = function(req,res){}