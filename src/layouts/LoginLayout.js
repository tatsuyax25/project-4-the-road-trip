import React from 'react';


const LoginForm = () => (
    <div className="ui grid" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <div className="ui column" style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <img className="ui image" src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
  
            <button className="ui button" color='teal' fluid size='large'>
              Login
            </button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </div>
  )
  
  export default LoginForm