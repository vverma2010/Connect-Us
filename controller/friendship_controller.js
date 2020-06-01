const User = require('../model/user');
const Friendship = require('../model/friendship');

module.exports.connectFriend = async function(req,res){
    try
    {


       fromUser = await User.findById(req.query.from);
       toUser =  await User.findById(req.query.to);


       let fromFriendship = await Friendship.findOne({
           from_user: req.query.from,
           to_user: req.query.to
       });

       let toFriendship = await Friendship.findOne({
        from_user: req.query.to,
        to_user: req.query.from
    });


       if(fromFriendship)
       {
           fromUser.friends.pull(fromFriendship._id);
           fromUser.save();

           fromFriendship.remove();
           

           toUser.friends.pull(toFriendship._id);
           toUser.save();

           toFriendship.remove();
       }

       else
       {
           let fromUserFriend = await Friendship.create({
               from_user: req.query.from,
               to_user: req.query.to
           });
           let toUserFriend = await Friendship.create({
            from_user: req.query.to,
            to_user: req.query.from
            });

           fromUser.friends.push(fromUserFriend._id);
           fromUser.save();

           toUser.friends.push(toUserFriend._id);
           toUser.save();
           
       }
       return res.redirect("back")

    }
    catch(err)
    {
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}