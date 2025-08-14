import React from 'react';


export default function ProfileBio({ user }) {
    return (
        <div className="ui grid" textAlign="center" columns={2} className="Profile">
            <div className="ui grid".Row>
                <div className="ui grid".Column>
                    <img className="ui image"
                        src={`${user.photoUrl
                                ? user.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                            } `}
                        avatar
                        size="small"
                    />
                </Grid.Column>
                <div className="ui grid".Column textAlign="left" style={{ maxWidth: 450 }}>
                    <Segment vertical>
                        <h3>{user.username}</h3>
                    </Segment>
                    <Segment>
                        <span>Bio: {user.bio}</span>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </div>
    );
}