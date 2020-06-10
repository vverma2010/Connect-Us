const Post = require('../../../model/post');
const Comment = require('../../../model/comment');
module.exports.index =async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });


    return res.json(200, {
        message: 'List of posts',
        posts: posts
    });
}

module.exports.destroy = async function(req, res){

    try
    {
          let post = await Post.findById(req.params.id);
          if(post.user == req.user.id)
          {
                post.remove();
    
            await Comment.deleteMany({post :req.params.id});
    
            
            return res.json(200,{
                message: 'Post and associated comments are deleted'
            });
          }
          else{
              return res.json(401,{
                  message: "You cannot delete this post"
              });
          }
          
            
       
       }
    catch(err)
    {
        console.log('error', err);
        return res.json(500,{
            message:'Intrnal Server Error'
        })
 
    }
    
 
 };