import React from 'react';

export default function PageHeader({ user, handleLogout }) {
    if (user) {
        return (
            <div className="ui menu" style={{backgroundColor: '#1b1c1d', color: 'white'}}>
                {user && <a className="ui menu item" href={`/${user.username}`}>
                    <img className="ui image avatar" src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} alt="avatar" />
                </a>}

                <a className="ui menu item" href='/'>
                    Home
                </a>

                <a className="ui menu item" href={`/${user.username}`}>
                    Profile
                </a>

                <div className="ui menu item" style={{marginLeft: 'auto'}}>
                    <span className="ui icon">📷</span>
                </div>

                <div className="ui menu item">
                    <button className="ui button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        )
    }

    return (
        <div></div>
    )
}