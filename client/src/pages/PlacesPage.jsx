import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "../Perks";
import axios from 'axios';

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

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    )
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    )
  }

  async function addPhotoLink(ev) {
    ev.preventDefault();
    const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos(prev => [...prev, fileName])
    setPhotoLink('');
  }
  console.log(addedPhotos)

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
          <form>
            {/* Title */}
            {preInput('Title', 'Tittle for your place. should be short and catchy as in advertisement.')}
            <input type="text" placeholder="title, for example: My lovely apt"
              value={title} onChange={ev => setTitle(ev.target.value)}
            />

            {/* Address */}
            {preInput('Address', 'Address for your place.')}
            <input type="text" placeholder="title, for example: My lovely apt"
              value={address} onChange={ev => setAddress(ev.target.value)}
            />

            {/* Photos */}
            {preInput('Photos', 'more = better')}
            <div className="flex gap-2">
              <input type="text" placeholder="Link image....." value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
              <button onClick={addPhotoLink} className="px-4 whitespace-nowrap rounded-2xl">Add image</button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 && addedPhotos.map((photo, i) => (
                <div className="rounded-2xl overflow-hidden">
                  <img src={`http://localhost:4000/uploads/${photo}`} key={i} alt="" srcset="" />
                </div>
              ))}

              <button className="p-8 text-gray-500 rounded-2xl bg-transparent border flex justify-center gap-1 font-bold items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
              </button>
            </div>

            {/* Description */}
            {preInput('Description', 'Description of place')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

            {/* Perks */}
            {preInput('Perks', 'Perks of place')}
            <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {/* Perks */}
            {preInput('Check in&out times', 'add check in and out times, remember to some time window cleaning')}
            <div className="grid sm:grid-cols-3">
              <div>
                <h3>Check in time</h3>
                <input type="text" placeholder="14:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
              </div>
              <div>
                <h3>Check out time</h3>
                <input type="text" placeholder="17:00" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
              </div>
              <div>
                <h3>Max guest</h3>
                <input type="text" placeholder="2" value={maxGuests} onChange={ev => setMaxGuest(ev.target.value)} />
              </div>
            </div>

            {/* Extra info */}
            {preInput('Extra info', 'House rules, etc')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

            {/* button */}
            <button className="bg-primary text-white border my-1 px-3 py-2 w-full rounded-2xl">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage