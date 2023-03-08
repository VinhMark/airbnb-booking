import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext"

const AccountPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  if (!user) {
    return <Navigate to='/login' />
  }

  let { subPage } = useParams();

  const handleLogout = async () => {
    await axios.post('/logout');
    setUser(null);
    setRedirect('/');
  }

  const linkClass = (type = null) => {
    let classes = 'px-6 py-2 ';
    if (!subPage) {
      subPage = 'profile';
    }

    if (type === subPage) {
      classes += 'text-white bg-primary rounded-full';
    }
    return classes
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className="w-full flex gap-2 my-8 justify-center items-center">
        <Link className={linkClass('profile')} to='/account' >My account</Link>
        <Link className={linkClass('bookings')} to='/account/bookings'>My bookings</Link>
        <Link className={linkClass('places')} to='/account/places'>My accommodations</Link>
      </nav>

      {subPage === 'profile' && (
        <div className="flex flex-col max-w-lg mx-auto text-center">
          <span>Login with {user.name} : {user.email}</span>
          <button className="mt-2 bg-primary rounded-full text-white py-2" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
}

export default AccountPage;