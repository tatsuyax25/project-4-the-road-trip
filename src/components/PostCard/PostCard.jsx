import React from 'react';

import { Link } from 'react-router-dom';


function PostCard({ post, isProfile, user, removeLike, addLike }) {
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
                    <span style={{fontSize: '14px', color: '#8e8e8e'}}>
                        {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
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
        </div>
    );
}

export default PostCard;