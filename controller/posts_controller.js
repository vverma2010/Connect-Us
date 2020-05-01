const Post = require('../model/post');
const Comment = require('../model/comment');
module.exports.posts = async function(req,res)
{
   try
   {
      let post = await Post.create({
         content:req.body.content,
         user: req.user._id
      });
      
   }
   
   catch(err)
   {
      console.log("Error in creating a post");
         return;
   }
   return res.redirect('back');
}

module.exports.destroy = async function(req, res){

   try
   {
         let post = await Post.findById(req.params.id);
      if(post.user == req.user.id)
      {
         post.remove();

         await Comment.deleteMany({post :req.params.id});
            return res.redirect('back');
         
      }
      else{
         return res.redirect('back');
      }
   }
   catch
   {
      console.log("Error in creating a post");
      return;
   }
   

};