const Post = require('../model/post');
const User = require('../model/user');
const Friendship=require('../model/friendship');


module.exports.home = async function(req, res){


    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        // populate the user for each comment
        .populate({
            path: 'comments',
            populate: {
                path: 'user likes'
            }
        }).populate('likes');
    
        let users = await User.find({});
        let friends=[]
        if(req.user)
        {
            let friendships=await Friendship.find({from_user:req.user._id});
            console.log("friendhsips",friendships);
         
            for(friendship of friendships)
            {
                let friend=await User.findById(friendship.to_user);
                console.log(friend);
                friends.push(friend);
            }
            console.log(friends);
           
        }
        
        
       
        return res.render('home', {
            title: "Connect-Us | Home",
            posts:  posts,
            all_users: users,
            friends:friends,
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
