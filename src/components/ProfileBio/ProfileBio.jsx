import React from 'react';

export default function ProfileBio({ user }) {
    return (
        <div className="ui grid Profile" style={{textAlign: "center"}}>
            <div className="row">
                <div className="ui column">
                    <img className="ui image avatar"
                        src={user.photoUrl
                                ? user.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                            }
                        alt="profile"
                    />
                </div>
                <div className="ui column" style={{textAlign: "left", maxWidth: 450}}>
                    <div className="ui segment">
                        <h3>{user.username}</h3>
                    </div>
                    <div className="ui segment">
                        <span>Bio: {user.bio}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}