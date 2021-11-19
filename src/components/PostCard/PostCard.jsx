import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


function PostCard({ post, isProfile, user, removeLike, addLike }) {
    const likeIndex = post.likes.findIndex(
        (eachLike) => eachLike.username === user.username
    );

    const likeColor = likeIndex > -1 ? "red" : "grey";

    const clickHandler =
        likeIndex > -1
            ? () => removeLike(post.likes[likeIndex]._id)
            : () => addLike(post._id);

    const deleteHandler = (e) => {
        e.preventDefault()
        console.log("click")

    }


    return (
        <Card key={post._id} raised>
            {isProfile ? (
                ""
            ) : (
                <Card.Content textAlign="left">
                    <Card.Header>
                        <Link to={`/${post.user.username}`}>
                            <Image
                                size="large"
                                avatar
                                src={
                                    post.user.photoUrl
                                        ? post.user.photoUrl
                                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                }
                            />
                            {post.user.username}
                        </Link>
                    </Card.Header>
                </Card.Content>
            )}
            <Image src={`${post.photoUrl}`} wrapped ui={false} />
            <Card.Content>
                <Card.Description>{post.caption}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign={"right"}>
                <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler} />
                <Icon size="large" color="red" onClick={(e)=>{deleteHandler()}} />
                {post.likes.length} Likes
            </Card.Content>
        </Card>
    );
}

export default PostCard;