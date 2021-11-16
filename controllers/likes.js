const Post = require('../models/post');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){

    try {
        const post = await Post.findById(req.params.id);
        post.like.push({username: req.user.username, userId: req.user._id});
        await post.save(201).json({data: 'like added'})
    } catch(err){
        res.status(400).json({err})
    }
}