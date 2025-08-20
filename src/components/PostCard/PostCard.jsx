import React, { useState } from 'react';

import { Link } from 'react-router-dom';


function PostCard({ post, isProfile, user, removeLike, addLike, addComment, removeComment }) {
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const likeIndex = post.likes.findIndex(
        (eachLike) => eachLike.username === user.username
    );

    const likeColor = likeIndex > -1 ? "red" : "grey";

    function clickHandler() {
        if (likeIndex > -1) {
            removeLike(post.likes[likeIndex]._id)
        } else { 
            addLike(post._id);
        }
    }
        

    const deleteHandler = (e) => {
        e.preventDefault()
        console.log("click")
    }
    
    const handleAddComment = async () => {
        if (comment.trim()) {
            try {
                const newComment = {
                    text: comment.trim(),
                    username: user.username,
                    _id: Date.now() // Temporary ID until backend is implemented
                };
                
                setComments([...comments, newComment]);
                setComment('');
                
                // Call parent function if provided
                if (addComment) {
                    addComment(post._id, newComment);
                }
            } catch (err) {
                console.error('Error adding comment:', err);
            }
        }
    }
    
    const handleDeleteComment = async (commentId) => {
        try {
            setComments(comments.filter((c, index) => (c._id || index) !== commentId));
            
            // Call parent function if provided
            if (removeComment) {
                removeComment(post._id, commentId);
            }
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    }


    return (
        <div className="ui card" key={post._id}>
            {!isProfile && (
                <div className="post-header">
                    <Link to={`/${post.user.username}`}>
                        <img className="ui image avatar"
                            src={
                                post.user.photoUrl
                                    ? post.user.photoUrl
                                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                            }
                            alt="avatar"
                        />
                        <span>{post.user.username}</span>
                    </Link>
                </div>
            )}
            
            <img className="post-image" src={`${post.photoUrl}`} alt="post" />
            
            <div className="post-content">
                <p style={{margin: 0, fontSize: '14px', color: '#262626'}}>{post.caption}</p>
            </div>
            
            <div className="post-actions">
                <div className="post-likes">
                    <span 
                        className="ui icon" 
                        style={{color: likeColor, fontSize: '20px'}} 
                        onClick={clickHandler}
                    >
                        {likeIndex > -1 ? '❤️' : '🤍'}
                    </span>
                    <span 
                        className="ui icon" 
                        style={{color: '#262626', fontSize: '20px', cursor: 'pointer'}} 
                        onClick={() => setShowComments(!showComments)}
                    >
                        💬
                    </span>
                </div>
                
                <span 
                    className="ui icon" 
                    style={{color: "#8e8e8e", fontSize: '18px'}} 
                    onClick={deleteHandler}
                >
                    🗑️
                </span>
            </div>
            
            <div className="post-likes-count" style={{padding: '0 16px 8px'}}>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#262626'}}>
                    {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
                </span>
            </div>
            
            {showComments && (
                <div className="comments-section">
                    <div className="comments-list" style={{padding: '0 16px', maxHeight: '200px', overflowY: 'auto'}}>
                        {comments && comments.length > 0 ? (
                            comments.map((commentItem, index) => (
                                <div key={index} className="comment-item" style={{marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <span style={{fontWeight: '600', fontSize: '14px', color: '#262626'}}>
                                            {commentItem.username}
                                        </span>
                                        <span style={{fontSize: '14px', color: '#262626', marginLeft: '8px'}}>
                                            {commentItem.text}
                                        </span>
                                    </div>
                                    {commentItem.username === user.username && (
                                        <button
                                            onClick={() => handleDeleteComment(commentItem._id || index)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#ed4956',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                padding: '2px 4px'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p style={{fontSize: '14px', color: '#8e8e8e', margin: '8px 0'}}>No comments yet</p>
                        )}
                    </div>
                    
                    <div className="comment-form" style={{padding: '8px 16px', borderTop: '1px solid #efefef'}}>
                        <div style={{display: 'flex', gap: '8px'}}>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '14px',
                                    padding: '8px 0'
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && comment.trim()) {
                                        handleAddComment();
                                    }
                                }}
                            />
                            <button
                                onClick={handleAddComment}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#0095f6',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostCard;