import React, { useState } from 'react';


export default function AddRoadTripForm(props) {
    const [selectedFile, setSelectedFile] = useState("");
    const [state, setState] = useState({
        caption: "",
    });

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", selectedFile);
        formData.append("caption", state.caption);
        props.handleAddPost(formData);
        // Have to submit the form now! We need a function!
    }

    return (
        <div className="feed-container">
            <div className="post-form">
                <h3 style={{margin: '0 0 16px 0', color: '#262626'}}>Share Your Road Trip</h3>
                <form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            name="caption"
                            value={state.caption}
                            placeholder="What's on your road trip?"
                            onChange={handleChange}
                            required
                            style={{
                                border: '1px solid #dbdbdb',
                                borderRadius: '6px',
                                padding: '12px',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <div className="field">
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleFileInput}
                            style={{
                                border: '1px solid #dbdbdb',
                                borderRadius: '6px',
                                padding: '8px',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                    <button className="ui button" type="submit" style={{width: '100%'}}>
                        📸 Share Road Trip
                    </button>
                </form>
            </div>
        </div>
    );

}