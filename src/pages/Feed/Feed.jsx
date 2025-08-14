import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PostFeed from "../../components/PostFeed/PostFeed";
import PostForm from "../../components/PostForm/PostForm";
import * as postsApi from "../../utils/postApi";
import * as likesApi from "../../utils/likesApi";



export default function Feed(props) {
    const [posts, setPosts] = useState([]);
    console.log(posts)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Have a function that makes an api call to update the state

    async function handleAddPost(post) {
        try {
            setLoading(true);
            const data = await postsApi.create(post); // our server is going to return
            // the created post, that will be inside of data, which is th response from
            // the server, we then want to set it in state
            console.log(data, " <- this is response from the server, in handleAddPost");
            setPosts([data.post, ...posts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    }

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId);
            console.log(data, ' <- this data the response from likes create')
            getPosts()
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likesId) {
        try {
            const data = await likesApi.removeLike(likesId);
            console.log(data, ' <- this is data the response from likes delete')
            getPosts(false)
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function getPosts(showLoading) {
        try {
            showLoading ? setLoading(true) : setLoading(false)
            const data = await postsApi.getAll();
            setPosts([...data.posts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err, " <- this is the error");
        }
    }

    useEffect(() => {
        getPosts();
    }, []); // <- useEffect with the empty array this make the getPosts function call when the componenet is loaded
    // on the page

    // Always check the error before loading, because if there is an error
    // we know something went wrong with the fetch call, therefore the http request
    // is complete
    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="ui grid" centered>
            <div className="row">
                <div className="ui column" style={{ maxWidth: 450 }}>
                    <PostForm handleAddPost={handleAddPost} />
                </Grid.Column>
            </Grid.Row>
            <div className="row">
                <div className="ui column" style={{ maxWidth: 450 }}>
                    <PostFeed
                        posts={posts}
                        isProfile={false}
                        numPhotosCol={1}
                        loading={loading}
                        user={props.user}
                        addLike={addLike}
                        removeLike={removeLike}
                    />
                </Grid.Column>
            </Grid.Row>
        </div>
    );
}
