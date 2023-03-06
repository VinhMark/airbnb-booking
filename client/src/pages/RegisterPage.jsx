import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const RegisterPage = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
  }


  useEffect(() => {

    const inputs = document.querySelectorAll('input').forEach(e => {
      e.addEventListener('onChange', (ev) => {
        console.log(ev)
      })
    })
console.log(inputs)
    return () => {

    }
  }, [user])


  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center font-bold mb-4'>Register</h1>
        <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
          <input type="text" name='name' placeholder='Enter your name'/>
          <input type="email" name='email' placeholder='Enter your email' />
          <input type="password" name='password' placeholder='Enter you password' />
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