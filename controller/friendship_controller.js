const User = require('../model/user');
const Friendship = require('../model/friendship');

module.exports.connectFriend = async function(req,res){
    try
    {
       let added;
       let sent = false;


       added = await User.findById(req.query.id).populate('friends');


       let existingFriend = await Friendship.findOne({
           from_user: req.query.id,
           to_user: req.query.id
       });


       if(existingFriend)
       {
           added.Friendship.pull(existingFriend._id);
           added.save();

           existingFriend.remove();
           sent = true;
       }

       else
       {
           let newFriend = await Friendship.create({
               from_user: req.query.id,
               to_user: req.query.id
           });

           added.friends.push(newFriend._id);
           added.save();
       }
       return res.json(200,{
           message: 'Request Successful',
           data: {
               sent: sent
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