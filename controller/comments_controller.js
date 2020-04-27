const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.comments = function(req,res){
    Post.findById(req.body.hidden_id , function(err, post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.hidden_id,
                user: req.user._id
            }, function(err, comment){
                // handle error
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}