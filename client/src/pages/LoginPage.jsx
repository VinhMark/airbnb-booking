import React from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center font-bold mb-4'>Login</h1>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
          <input type="email" placeholder='Enter your email' />
          <input type="password" placeholder='Enter you password' />
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