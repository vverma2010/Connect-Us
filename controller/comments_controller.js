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
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err , comment){
        if(comment.user == req.user.id){
            
            let postId = comment.post;
            comment.remove();
            
            Post.findByIdAndUpdate(postId ,{ $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
                
            })

        }
        else{
            return res.redirect('back');
        }
            
        });


}