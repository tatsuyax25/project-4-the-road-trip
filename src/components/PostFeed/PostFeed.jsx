import React from 'react';

import PostCard from '../PostCard/PostCard';

export default function PostFeed({
    posts,
    numPhotosCol,
    isProfile,
    loading,
    user,
    addLike,
    removeLike,
    addComment,
    removeComment,
    deletePost
}) {
    return (
        <div className="ui cards" style={{display: 'grid', gridTemplateColumns: `repeat(${numPhotosCol}, 1fr)`, gap: '1rem'}}>
            {loading ? (
                <div className="ui segment">
                    <div className="ui loader"></div>
                    <p>Loading</p>
                </div>
            ) : null}
            {posts.map((post) => {
                return (
                    <PostCard
                        post={post}
                        key={post._id}
                        isProfile={isProfile}
                        user={user}
                        removeLike={removeLike}
                        addLike={addLike}
                        addComment={addComment}
                        removeComment={removeComment}
                        deletePost={deletePost}
                    />
                );
            })}
        </div>
    )
}