import React from 'react';

export default function ProfileBio({ user, loggedInUser, isFollowing, onFollow, onUnfollow }) {
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
                    <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px'}}>
                        <h2 className="profile-username">{user.username}</h2>
                        {loggedInUser && user.username !== loggedInUser.username && (
                            <button
                                onClick={isFollowing ? onUnfollow : onFollow}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    backgroundColor: isFollowing ? '#f5f5f5' : '#0095f6',
                                    color: isFollowing ? '#262626' : 'white'
                                }}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                    <div className="profile-stats">
                        <span className="stat-item">📸 Posts</span>
                        <span className="stat-item">👥 {user.followers ? user.followers.length : 0} Followers</span>
                        <span className="stat-item">👤 {user.following ? user.following.length : 0} Following</span>
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