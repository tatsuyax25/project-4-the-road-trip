import React from 'react';

export default function ProfileBio({ user }) {
    return (
        <div className="profile-bio">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img 
                        className="profile-image"
                        src={user.photoUrl
                                ? user.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                            }
                        alt="profile"
                    />
                </div>
                
                <div className="profile-info">
                    <h2 className="profile-username">{user.username}</h2>
                    <div className="profile-stats">
                        <span className="stat-item">📸 Posts</span>
                        <span className="stat-item">✈️ Traveler</span>
                    </div>
                </div>
            </div>
            
            {user.bio && (
                <div className="profile-bio-text">
                    <p>{user.bio}</p>
                </div>
            )}
        </div>
    );
}