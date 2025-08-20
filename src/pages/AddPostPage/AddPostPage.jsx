import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../components/PostForm/PostForm';
import * as postsApi from '../../utils/postApi';

export default function AddPostPage(props) {
    const navigate = useNavigate();
    
    async function handleAddPost(post) {
        try {
            const data = await postsApi.create(post);
            console.log('Post created successfully:', data);
            // Redirect to home page after successful post creation
            navigate('/');
        } catch (err) {
            console.error('Error creating post:', err);
            // Handle error (could add error state here)
        }
    }
    
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#fafafa',
            paddingTop: '20px'
        }}>
            <PostForm handleAddPost={handleAddPost} />
        </div>
    );
}