import React, { useState } from 'react';

import { Link } from 'react-router-dom';


function PostCard({ post, isProfile, user, removeLike, addLike, addComment, removeComment, deletePost }) {
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [showModal, setShowModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [editingComment, setEditingComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        e.preventDefault();
        setShowDeleteModal(true);
    }
    
    const confirmDelete = () => {
        if (deletePost) {
            deletePost(post._id);
        }
        setShowDeleteModal(false);
    }
    
    const cancelDelete = () => {
        setShowDeleteModal(false);
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
            setShowModal(false);
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    }
    
    const handleEditComment = async () => {
        if (editingComment.trim() && selectedComment) {
            try {
                const updatedComments = comments.map((c, index) => {
                    if ((c._id || index) === (selectedComment._id || selectedComment.index)) {
                        return {...c, text: editingComment.trim()};
                    }
                    return c;
                });
                
                setComments(updatedComments);
                setShowModal(false);
                setIsEditing(false);
                
                // TODO: Call parent function for backend update
                console.log('Editing comment:', selectedComment, 'to:', editingComment);
            } catch (err) {
                console.error('Error editing comment:', err);
            }
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
                        <div>
                            <span style={{fontWeight: '600'}}>{post.user.username}</span>
                            <div style={{fontSize: '12px', color: '#8e8e8e'}}>
                                {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
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
                
                {post.user.username === user.username && (
                    <span 
                        className="ui icon" 
                        style={{color: "#ed4956", fontSize: '18px', cursor: 'pointer'}} 
                        onClick={deleteHandler}
                        title="Delete post"
                    >
                        🗑️
                    </span>
                )}
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
                                            onClick={() => {
                                                setSelectedComment({...commentItem, index});
                                                setEditingComment(commentItem.text);
                                                setShowModal(true);
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#8e8e8e',
                                                fontSize: '16px',
                                                cursor: 'pointer',
                                                padding: '2px 4px'
                                            }}
                                        >
                                            ⋯
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
            
            {/* Comment Options Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                    }}>
                        {!isEditing ? (
                            <>
                                <h3 style={{margin: '0 0 16px 0', fontSize: '16px', color: '#262626'}}>Comment Options</h3>
                                
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        margin: '8px 0',
                                        backgroundColor: '#0095f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Edit Comment
                                </button>
                                
                                <button
                                    onClick={() => handleDeleteComment(selectedComment._id || selectedComment.index)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        margin: '8px 0',
                                        backgroundColor: '#ed4956',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Delete Comment
                                </button>
                                
                                <button
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        margin: '8px 0',
                                        backgroundColor: '#f5f5f5',
                                        color: '#262626',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 style={{margin: '0 0 16px 0', fontSize: '16px', color: '#262626'}}>Edit Comment</h3>
                                
                                <textarea
                                    value={editingComment}
                                    onChange={(e) => setEditingComment(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #dbdbdb',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        minHeight: '80px',
                                        resize: 'vertical',
                                        marginBottom: '12px'
                                    }}
                                    placeholder="Edit your comment..."
                                />
                                
                                <div style={{display: 'flex', gap: '8px'}}>
                                    <button
                                        onClick={handleEditComment}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            backgroundColor: '#0095f6',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Save
                                    </button>
                                    
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditingComment(selectedComment.text);
                                        }}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            backgroundColor: '#f5f5f5',
                                            color: '#262626',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            
            {/* Delete Post Confirmation Modal */}
            {showDeleteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{margin: '0 0 16px 0', fontSize: '18px', color: '#262626'}}>
                            Delete Post?
                        </h3>
                        
                        <p style={{margin: '0 0 24px 0', fontSize: '14px', color: '#8e8e8e'}}>
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                        
                        <div style={{display: 'flex', gap: '12px'}}>
                            <button
                                onClick={cancelDelete}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    backgroundColor: '#f5f5f5',
                                    color: '#262626',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}
                            >
                                No
                            </button>
                            
                            <button
                                onClick={confirmDelete}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    backgroundColor: '#ed4956',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600'
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostCard;