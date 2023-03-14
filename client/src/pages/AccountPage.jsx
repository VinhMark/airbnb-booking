import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext"
import PlacesPage from "./PlacesPage";

const AccountPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subPage } = useParams();

  if (!user && !redirect) {
    return <Navigate to='/login' />
  }

  const handleLogout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav subPage={subPage} />
      {subPage === 'profile' && (
        <div className="flex flex-col max-w-lg mx-auto text-center">
          <span>Login with {user.name} : {user.email}</span>
          <button className="mt-2 bg-primary rounded-full text-white py-2" onClick={handleLogout}>Logout</button>
        </div>
      )}
      {subPage === 'places' && (<PlacesPage />)}
    </div>
  )
}

export default AccountPage;