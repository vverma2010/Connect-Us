const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    to_user:
    {
        type: String,
        ref:'User'
    },
    from_user:
    {
        type: String,
        ref:'User'
    },
    message:[
        {
            content :{type: String,
            required: true,
            timestamps:true}
        }
    ]

},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;