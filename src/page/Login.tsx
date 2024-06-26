import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userDataState } from '../atoms/userDataState';

const Login: React.FC = () => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const navigate = useNavigate(); // Use useNavigate hook to navigate between routes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [id]: value
    }));
  };

  const handleLogin = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to sign up');
        }
  
        // Optionally, handle response from the server
        const data = await response.json();
        localStorage.setItem('Authorization',data.authToken);
        // Redirect to home page upon successful sign-up
        navigate('/');
      } catch (error) {
        console.error('Error signing up:', error);
        // Handle error (e.g., show error message to the user)
      }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='card p-4' style={{ maxWidth: '400px' }}> 
      <h2>Login</h2>
        <form>
          {/* Email input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" id="email" className="form-control" value={userData.email} onChange={handleInputChange} />
          </div>

          {/* Password input */}
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" value={userData.password} onChange={handleInputChange} />
          </div>

          {/* Submit button */}
          <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleLogin}>Login</button>

          {/* Signup link */}
          <div className="text-center">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
