import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link} from 'react-router-dom';

const ForgotPassword = () => {
 const emailRef = useRef();

   const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('')
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your email for further instructions')

    } catch (err) {
      console.log(err);
      setError(`Failed to reset  - ${err}`);
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {!loading && error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          {/* {JSON.stringify(currentUser?.email)} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='password'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} />
            </Form.Group>
            <Button type='submit' className='w-100'>
              Reset Password
            </Button>
          </Form>
          <div className='mt-1'>
            <Link to='/login' className='small'>
              {' '}
             login
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
};
export default ForgotPassword;
