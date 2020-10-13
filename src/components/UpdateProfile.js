import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');

      return error;
    }

    const promises = [];
    setLoading(true)
    setError('')
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises).then(() => {
      history.push('/');
    }).catch(()=>{
      setError('Failed to update profile')
    }).finally(()=>{
      setLoading(false)
    });

    try {
      setError('');
      setLoading(true);
      // await signup(emailRef.current.value, passwordRef.current.value);
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
          <h2 className='text-center mb-4'>Update profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {/* {JSON.stringify(currentUser?.email)} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                defaultValue={currentUser?.email}
              />
            </Form.Group>
            <Form.Group id='email'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep Your old password'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type='password'

                ref={passwordConfirmRef}
                placeholder='Leave blank to keep Your old password'
              />
            </Form.Group>
            <Button type='submit' className='w-100'>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>{' '}
    </>
  );
};

export default UpdateProfile;
