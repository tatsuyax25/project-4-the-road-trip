const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    photoUrl: String,
    caption: String,
    likes: [likesSchema] // <- one post has many likes
})

module.exports = mongoose.model('Post', postSchema);