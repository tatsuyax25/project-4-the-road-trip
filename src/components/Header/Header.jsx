import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Button } from 'semantic-ui-react'


export default function PageHeader({ user, handleLogout }) {
    if (user) {
        // return (
        //     <Segment clearing>
        //         <Header as='h3' floated='right'>
        //             <Link to="/"><Icon name="camera"></Icon></Link>
        //             <Link to='' onClick={handleLogout}>Logout</Link>
        //         </Header>
        //         <Header as='h3' floated='left'>
        //             <Link to={`/${user.username}`}><img className="ui image" src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></img></Link>          
        //         </Header>
        //     </Segment>
        // )

        return (
            <Menu inverted>
                {user && <Menu.Item href={`/${user.username}`}>
                    <img className="ui image" src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar />
                </Menu.Item>}

                <Menu.Item
                    name='home'
                    href='/'
                >
                    Home
                </Menu.Item>

                <Menu.Item
                    name='profile'
                    href={`/${user.username}`}
                >
                    Profile
                </Menu.Item>

                <Menu.Item floated='right'>
                    <Icon name="camera"></Icon>
                </Menu.Item>

                <Menu.Item position='right'>
                    <button className="ui button" onClick={handleLogout}>Logout</button>
                </Menu.Item>
                
            </Menu>

        )
    }

    return (
        <div></div>
    )

}