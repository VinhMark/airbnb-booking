import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LoginPage = () => {

  const [userForm, setUserForm] = useState({ email: '', password: '' })
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setUserForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', userForm)
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log(error)
    }
  }

  if (redirect) {
    return <Navigate to='/' />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center font-bold mb-4'>Login</h1>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
          <input type="email" placeholder='Enter your email'
            value={userForm.email} name='email'
            onChange={handleChange} />
          <input type="password" placeholder='Enter you password'
            value={userForm.password} name='password'
            onChange={handleChange} />
          <button type='submit' className='primary'>Login</button>
        </form>
        <div className='text-center py-2 text-gray-500'>
          Don't have an account yet!
          <Link className='underline text-black ml-1' to={'/register'}>Register now</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage