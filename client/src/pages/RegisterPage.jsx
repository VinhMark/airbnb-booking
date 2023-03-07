import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('/register', user)
      console.log(data)
    } catch (error) {
      setError('Email is existed, please change another email.')
    }
  }

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center font-bold mb-4'>Register</h1>
        {error && (<span className="text-red-500">{error}</span>)}
        <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
          <input type="text" name='name' placeholder='Enter your name' value={user.name} onChange={handleChange} />
          <input type="email" name='email' placeholder='Enter your email' value={user.email} onChange={handleChange} />
          <input type="password" name='password' placeholder='Enter you password' value={user.password} onChange={handleChange} />
          <button type='submit' className='primary'>Login</button>
        </form>
        <div className='text-center py-2 text-gray-500'>
          Already a member?
          <Link className='underline text-black ml-1' to={'/login'}>Login now</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage