const Comment = require('../model/comment');
const Post = require('../model/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');


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
                // hey listen
                // let me open notepad for this
            });
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user','name email').execPopulate();
            // commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err)
                {
                    console.log('Error in creating a queue');
                    return;
                }
                console.log('job enqueued',job.id);
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

            if(comment.user == req.user.id){
                
                let postId = comment.post;
                comment.remove();
                
                let post = await Post.findByIdAndUpdate(postId ,{ $pull: {comments: req.params.id}});
                console.log("delete",req.xhr);
                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message:"Comment Deleted"
                    })
            }
                req.flash('success', 'Comment is deleted');
                return res.redirect('back');    
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