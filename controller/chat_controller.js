const Chat = require('../model/chatbox');


module.exports.chats = async function(req,res)
{
    try
    {
        let chat = await Chat.create({
            message: req.body.message,
            user: req.user._id
        });
    }
    catch(err)
    {
        console.log(err);
    }
};