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
            {isProfile ? (
                ""
            ) : (
                <div className="content" style={{textAlign: "left"}}>
                    <div className="header">
                        <Link to={`/${post.user.username}`}>
                            <img className="ui image avatar"
                                src={
                                    post.user.photoUrl
                                        ? post.user.photoUrl
                                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                }
                                alt="avatar"
                            />
                            {post.user.username}
                        </Link>
                    </div>
                </div>
            )}
            <img className="ui image" src={`${post.photoUrl}`} alt="post" />
            <div className="content">
                <div className="description">{post.caption}</div>
            </div>
            <div className="content" style={{textAlign: "right"}}>
                <span className="ui icon" style={{color: likeColor, cursor: "pointer"}} onClick={clickHandler}>♥</span>
                <span className="ui icon" style={{color: "red", cursor: "pointer"}} onClick={(e)=>{deleteHandler()}}>🗑</span>
                {post.likes.length} Likes
            </div>
        </div>
    );
}

export default PostCard;