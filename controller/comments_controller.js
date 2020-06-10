const Comment = require('../model/comment');
const Post = require('../model/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../model/like');


module.exports.comments = async function(req,res)
{
    try
    {
            let post = await Post.findById(req.body.hidden_id);
        if(post){
            let comment= await Comment.create({
                content: req.body.content,
                post: req.body.hidden_id,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user','name email').execPopulate();
            // commentsMailer.newComment(comment);
            let job = queue.create('comment-emails',comment).save(function(err){
                if(err)
                {
                    console.log('Error in creating a queue');
                    return;
                }
                console.log(' comment job enqueued',job.id);
            });
            // console.log(" req h",req.xhr);
             return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment created"
                });
            
                
        }
    }
    catch(err)
    {
        req.flash('Error', err);
        return res.redirect('back');    

    }
    
}

module.exports.destroy = async function(req,res){
    try
    {
        let comment = await Comment.findById(req.params.id);
        let post=await Post.findById(comment.post);

            if(comment.user == req.user.id || req.user.id==post.user){
                
                let postId = comment.post;
                comment.remove();
                
                let post = await Post.findByIdAndUpdate(postId ,{ $pull: {comments: req.params.id}});
                
                // delete the likes of the comment
                await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
              
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message:"Comment Deleted"
                    })
            
                // req.flash('success', 'Comment is deleted');
                // return res.redirect('back');    
            }
            else{
                req.flash('error', 'You cannot delete this comment !!');
                return res.redirect('back');
            }

    }
    catch(err)
    {
        req.flash('Error', err);
        return res.redirect('back');
    }
}