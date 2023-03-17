import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import AccountNav from "../AccountNav";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/user-places').then(res => {
      setPlaces(res.data);
    })

    return (() => {
      setPlaces([]);
    })
  }, [])

  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <Link
          to={'/account/places/new'}
          className='py-2 px-6 text-white bg-primary rounded-full inline-flex'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
          Add Place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 && places.map((place) => (
          <Link to={`/account/places/${place._id}`} className="bg-gray-100 rounded-2xl p-4 flex gap-4" key={place._id}>
            <div className="w-32 h-32 bg-gray-300 shrink-0">
              {place.photos.length > 0 && (
                <img src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PlacesPage