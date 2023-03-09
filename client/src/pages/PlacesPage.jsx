import { useState } from "react";
import { Link, useParams } from "react-router-dom"

const PlacesPage = () => {
  const { action } = useParams();
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuest] = useState('')
  const [title, setTitle] = useState(1)

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
        <div>
          <form action="">
            {/* Title */}
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="test-sm text-gray-500">Tittle for your place. should be short and catchy as in advertisement.</p>
            <input type="text" placeholder="title, for example: My lovely apt" />

            {/* Address */}
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="test-sm text-gray-500">Address for your place.</p>
            <input type="text" placeholder="title, for example: My lovely apt" />

            {/* Photos */}
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="test-sm text-gray-500">more = better</p>
            <div className="flex gap-2">
              <input type="text" placeholder="Link image....." />
              <button className="px-4 whitespace-nowrap rounded-2xl">Add image</button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="p-8 text-gray-500 rounded-2xl bg-transparent border flex justify-center gap-1 font-bold items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
              </button>
            </div>

            {/* Description */}
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="test-sm text-gray-500">Description of place</p>
            <textarea />

            {/* Perks */}
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="test-sm text-gray-500">Perks of place</p>
            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {/* Perk-wifi */}
              <label className='flex p-6 gap-2 border rounded-lg cursor-pointer' htmlFor="wifi">
                <input type="checkbox" name="" id="wifi" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
                <span>Wifi</span>
              </label>
              {/* Perk-wifi */}
              <label className='flex p-6 gap-2 border rounded-lg cursor-pointer' htmlFor="park">
                <input type="checkbox" name="" id="park" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span>Free parking spot</span>
              </label>
              {/* Perk-wifi */}
              <label className='flex p-6 gap-2 border rounded-lg cursor-pointer' htmlFor="tv">
                <input type="checkbox" name="" id="tv" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <span>TV</span>
              </label>
              {/* Perk-wifi */}
              <label className='flex p-6 gap-2 border rounded-lg cursor-pointer' htmlFor="entrance">
                <input type="checkbox" name="" id="entrance" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <span>Private entrance</span>
              </label>
              {/* Perk-wifi */}
              <label className='flex p-6 gap-2 border rounded-lg cursor-pointer' htmlFor="pets">
                <input type="checkbox" name="" id="pets" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                <span>Pets</span>
              </label>
              {/* Perk-wifi */}
              <label className='flex p-6 gap-2 border rounded-lg cursor-pointer' htmlFor="radio">
                <input type="checkbox" name="" id="radio" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
                <span>Radio</span>
              </label>
            </div>

            {/* Perks */}
            <h2 className="text-2xl mt-4">Check in&out times</h2>
            <p className="test-sm text-gray-500">add check in and out times, remember to some time window cleaning</p>
            <div className="grid sm:grid-cols-3">
              <div>
                <h3>Check in time</h3>
                <input type="text" placeholder="14:00" />
              </div>
              <div>
                <h3>Check out time</h3>
                <input type="text" placeholder="17:00" />
              </div>
              <div>
                <h3>Max guest</h3>
                <input type="text" placeholder="2" />
              </div>
            </div>

            {/* Extra info */}
            <h2 className="text-2xl mt-4">Extra info</h2>
            <p className="test-sm text-gray-500">House rules, etc</p>
            <textarea />
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage