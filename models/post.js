const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String ,
        required : true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    //inculde the array of all id in post
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Like'
            }
        ]
},{
    timestamps:true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;


