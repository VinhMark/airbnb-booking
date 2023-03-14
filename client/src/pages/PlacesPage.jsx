import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import PlacesFormPage from "./PlacesFormPage";

const PlacesPage = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== 'new' && (

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
      )}

      {action === 'new' && (
        <PlacesFormPage />
      )}
    </div>
  );
}

export default PlacesPage