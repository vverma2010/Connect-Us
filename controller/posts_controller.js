const Post = require('../model/post');
const Comment = require('../model/comment');
const postsMailer = require('../mailers/posts_mailer');
const queue = require('../config/kue');
const postEmailWorker = require('../workers/post_email_worker');
const Like = require('../model/like');

module.exports.posts = async function(req,res)
{
   try
   {
      let post = await Post.create({
         content:req.body.content,
         user: req.user._id
      });
      post=await post.populate('user','name email').execPopulate();
      // postsMailer.newPost(post);
      let job = queue.create('emails',post).save(function(err){
         if(err)
         {
            console.log('Error in creating queue');
            return;
         }
         console.log('job enqueued',job.id);
      });
      if(req.xhr){
         
         return res.status(200).json({
            data:{
               post:post,
               postID:post._id
            },
            message: "Post is Created !!" 
         });
      }

      req.flash('success', 'Post created successfully');
      return res.redirect('back');
   }
   
   catch(err)
   {
      req.flash('error', err);
      return res.redirect('back');

   }
}

module.exports.destroy = async function(req, res){

   try
   {
         let post = await Post.findById(req.params.id);
         
      if(post.user == req.user.id)
      {
            // delete the associated likes for post
         await Like.deleteMany({likeable: post, onModel: 'Post'});

         // delete the associated likes for comment
         await Like.deleteMany({_id: {$in: post.comments}});


         post.remove();

         await Comment.deleteMany({post :req.params.id});

        
           // console.log("req xhr h");
            return res.status(200).json({
               data:{
                  post_id :req.params.id
               },
               message: "Post deleted successfully !!"
            });
         
         // req.flash('success', 'Post and associated comments are deleted');

         // return res.redirect('back');
         
      }
      else{
         req.flash('error', 'You cannot delete this post !!');

         return res.redirect('back');
      }
   }
   catch(err)
   {
      req.flash('error', err);
      return res.redirect('back');

   }
   

};