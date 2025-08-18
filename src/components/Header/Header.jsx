import React from 'react';

export default function PageHeader({ user, handleLogout }) {
    if (user) {
        return (
            <div className="ui menu">
                <div style={{display: 'flex', alignItems: 'center', flex: 1, minWidth: 0}}>
                    <h1 className="app-title" style={{margin: 0, marginRight: '20px', whiteSpace: 'nowrap'}}>The Road Trip</h1>
                    
                    <div style={{display: 'flex', gap: '4px', overflow: 'hidden'}}>
                        <a className="ui menu item" href='/' style={{whiteSpace: 'nowrap'}}>
                            🏠 <span className="nav-text">Home</span>
                        </a>
                        
                        <a className="ui menu item" href='/add-post' style={{whiteSpace: 'nowrap'}}>
                            ➕ <span className="nav-text">Share</span>
                        </a>

                        <a className="ui menu item" href={`/${user.username}`} style={{whiteSpace: 'nowrap'}}>
                            👤 <span className="nav-text">Profile</span>
                        </a>
                    </div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0}}>
                    <a href={`/${user.username}`} style={{textDecoration: 'none'}}>
                        <img 
                            className="ui image avatar" 
                            src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} 
                            alt="avatar" 
                            style={{width: '28px', height: '28px'}}
                        />
                    </a>
                    
                    <button 
                        className="ui button" 
                        onClick={handleLogout}
                        style={{fontSize: '12px', padding: '6px 12px', whiteSpace: 'nowrap'}}
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div></div>
    )
}