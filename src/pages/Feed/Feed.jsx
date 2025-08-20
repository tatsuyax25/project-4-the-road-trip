import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PostFeed from "../../components/PostFeed/PostFeed";

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
            const data = await postsApi.create(post);
            console.log(data, " <- this is response from the server, in handleAddPost");
            // Add new post at the beginning of the array (top of feed)
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
            
            // Update the specific post in state instead of refreshing all posts
            setPosts(posts.map(post => {
                if (post._id === postId) {
                    return {
                        ...post,
                        likes: [...post.likes, { username: props.user.username, _id: Date.now() }]
                    };
                }
                return post;
            }));
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likesId) {
        try {
            const data = await likesApi.removeLike(likesId);
            console.log(data, ' <- this is data the response from likes delete')
            
            // Update the specific post in state instead of refreshing all posts
            setPosts(posts.map(post => {
                return {
                    ...post,
                    likes: post.likes.filter(like => like._id !== likesId)
                };
            }));
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }
    
    async function addComment(postId, comment) {
        try {
            console.log('Adding comment to post:', postId, comment);
            // TODO: Implement backend API call for comments
            // For now, just update local state
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }
    
    async function removeComment(postId, commentId) {
        try {
            console.log('Removing comment:', commentId, 'from post:', postId);
            // TODO: Implement backend API call for comment deletion
            // For now, just update local state
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }
    
    async function deletePost(postId) {
        try {
            console.log('Deleting post:', postId);
            
            // Remove post from local state immediately for better UX
            const updatedPosts = posts.filter(post => post._id !== postId);
            setPosts(updatedPosts);
            
            // Call backend API to actually delete the post
            await postsApi.deletePost(postId);
            console.log('Post deleted successfully from database');
        } catch (err) {
            console.error('Error deleting post:', err);
            setError(err.message);
            // Refresh posts if deletion failed to restore the post
            getPosts(false);
        }
    }

    async function getPosts(showLoading) {
        try {
            showLoading ? setLoading(true) : setLoading(false)
            const data = await postsApi.getAll();
            // Sort posts by creation date, newest first
            const sortedPosts = data.posts.sort((a, b) => {
                const dateA = new Date(a.createdAt || 0);
                const dateB = new Date(b.createdAt || 0);
                return dateB - dateA; // Newest first
            });
            setPosts([...sortedPosts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err, " <- this is the error");
        }
    }

    useEffect(() => {
        getPosts(true); // Always show loading when component mounts
    }, []); // <- useEffect with the empty array this make the getPosts function call when the componenet is loaded
    // on the page
    
    // Refresh posts when component becomes visible (user returns from add post page)
    useEffect(() => {
        const handleFocus = () => {
            getPosts(false); // Refresh without loading indicator
        };
        
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

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
        <div className="feed-container">
            <PostFeed
                posts={posts}
                isProfile={false}
                numPhotosCol={1}
                loading={loading}
                user={props.user}
                addLike={addLike}
                removeLike={removeLike}
                addComment={addComment}
                removeComment={removeComment}
                deletePost={deletePost}
            />
        </div>
    );
}
