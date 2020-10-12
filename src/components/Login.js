import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom'

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  async function handleSubmit(e) {

    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login (emailRef.current.value, passwordRef.current.value);
history.push('/')
    } catch (err) {
      console.log(err);
      setError(`Failed to sign in - ${err}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log in</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {/* {JSON.stringify(currentUser?.email)} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required ref={passwordRef} />
            </Form.Group>
            <Button type='submit' className='w-100'>
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to = '/signup'>Sign Up</Link>
        </div>
    </>
  );
};
export default Login
