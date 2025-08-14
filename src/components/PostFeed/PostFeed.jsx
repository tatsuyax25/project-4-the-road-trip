import React from 'react';

import PostCard from '../PostCard/PostCard';

export default function PostFeed({
    posts,
    numPhotosCol,
    isProfile,
    loading,
    user,
    addLike,
    removeLike
}) {
    return (
        <Card.Group itemsPerRow={numPhotosCol} stackable>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="small">Loading</Loader>
                    </Dimmer>
                    <img className="ui image" src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
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
                    />
                );
            })}
        </Card.Group>
    )
}