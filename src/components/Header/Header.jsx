import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
    if(user){
        return (
            <Segment clearing>
                <Header as='h3' floated='right'>
                    <Link to="/"><Icon name="camera"></Icon></Link>
                    <Link to='' onClick={handleLogout}>Logout</Link>
                </Header>
                <Header as='h3' floated='left'>
                    <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image></Link>          
                </Header>
            </Segment>
        )
    }

    return (
        <div></div>
    )

}