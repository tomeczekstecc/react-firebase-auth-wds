import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import {Link} from 'react-router-dom'

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    console.log('sub');
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');

      return error;
    }
    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      console.log(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err);
      setError(`Failed to create account - ${err}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign up</h2>
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
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' required ref={passwordConfirmRef} />
            </Form.Group>
            <Button type='submit' className='w-100'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>{' '}
    </>
  );
};

export default Signup;
