const mongoose = require('mongoose');


const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the user who accepted this request, the naming is just to understand, otherwise, the users won't see a difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;
//i think sir explained in the video? or not
// Sir just gave hint that it'll work similar to likes.. and we have to make "add friend" button toggle..!! //okay u made likes? Yes.. but that "class part" was copied !! okay okay your number?
// 8595492739