const User = require('../models/user');

module.exports = {
    follow,
    unfollow,
    getFollowStatus
};

async function follow(req, res) {
    try {
        const { userId } = req.body;
        const currentUserId = req.user._id;
        
        // Can't follow yourself
        if (userId === currentUserId.toString()) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }
        
        // Add to current user's following list
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { following: userId }
        });
        
        // Add to target user's followers list
        await User.findByIdAndUpdate(userId, {
            $addToSet: { followers: currentUserId }
        });
        
        res.status(200).json({ message: "Successfully followed user" });
    } catch (err) {
        console.error('Follow error:', err);
        res.status(400).json({ error: err.message });
    }
}

async function unfollow(req, res) {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;
        
        // Remove from current user's following list
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: userId }
        });
        
        // Remove from target user's followers list
        await User.findByIdAndUpdate(userId, {
            $pull: { followers: currentUserId }
        });
        
        res.status(200).json({ message: "Successfully unfollowed user" });
    } catch (err) {
        console.error('Unfollow error:', err);
        res.status(400).json({ error: err.message });
    }
}

async function getFollowStatus(req, res) {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;
        
        const currentUser = await User.findById(currentUserId);
        const isFollowing = currentUser.following.includes(userId);
        
        res.status(200).json({ isFollowing });
    } catch (err) {
        console.error('Get follow status error:', err);
        res.status(400).json({ error: err.message });
    }
}