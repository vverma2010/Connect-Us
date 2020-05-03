const Comment = require('../model/comment');
const Post = require('../model/post');

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
                req.flash('success', 'Comment is Added !!');
                res.redirect('/');
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
                req.flash('success', 'Comment is deleted');
                return res.redirect('back');    
            }
            else{
                req.flash('error', 'You cannot delete this comment !!');
                return res.redirect('back');
            }

    }
    catch
    {
        req.flash('Error', err);
        return res.redirect('back');
    }
}