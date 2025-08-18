import React from 'react';
import PostForm from '../../components/PostForm/PostForm';

export default function AddPostPage(props) {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#fafafa',
            paddingTop: '20px'
        }}>
            <PostForm handleAddPost={props.handleAddPost} />
        </div>
    );
}