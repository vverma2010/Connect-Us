const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.OjectId
    },
    // this field is used for defining the type of the liked object since it is a dynamic reference
    likeable: {
        type: mongoose.Schema.OjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;