import React, { useState } from 'react';

import { Link } from 'react-router-dom';


function PostCard({ post, isProfile, user, removeLike, addLike }) {
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
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
                        {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment, index) => (
                                <div key={index} className="comment-item" style={{marginBottom: '8px'}}>
                                    <span style={{fontWeight: '600', fontSize: '14px', color: '#262626'}}>
                                        {comment.username}
                                    </span>
                                    <span style={{fontSize: '14px', color: '#262626', marginLeft: '8px'}}>
                                        {comment.text}
                                    </span>
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
                                        // Add comment functionality here
                                        console.log('Adding comment:', comment);
                                        setComment('');
                                    }
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (comment.trim()) {
                                        // Add comment functionality here
                                        console.log('Adding comment:', comment);
                                        setComment('');
                                    }
                                }}
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