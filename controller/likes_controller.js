const Like = require('../model/like');
const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.toggleLike = async function(req,res){
    try
    {
        // like/toggle/?id = qwertyuytre&type=Post or Comment
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post')
        {
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exists

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
           user: req.user._id 
        });
        // if like already exists the delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;

        }
        else
        {
            // else make new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message: 'Request successful',
            data: {
                deleted: deleted
            }
        })

    }
    catch(err)
    {
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}