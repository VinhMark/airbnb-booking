import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";

const PlacesFormPage = () => {

  const [address, setAddress] = useState('this is my address')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea molestias suscipit voluptates quae alias amet hic eum cumque unde temporibus molestiae expedita magnam iste, assumenda mollitia doloremque atque aut. Id?')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea molestias suscipit voluptates quae alias amet hic eum cumque unde temporibus molestiae expedita magnam iste, assumenda mollitia doloremque atque aut. Id?')
  const [checkIn, setCheckIn] = useState('1400')
  const [checkOut, setCheckOut] = useState('1700')
  const [maxGuests, setMaxGuest] = useState('2')
  const [title, setTitle] = useState('Lorem, ipsum dolor sit amet consectetur')

  const navigate = useNavigate();

  function preInput(header, description) {
    return (
      <div>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    )
  }

  async function handleAddPlace(e) {
    e.preventDefault();
    const { data } = await axios.post('/places', {
      title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests
    })
    console.log(data)
    navigate('/account/places')
  }

  return (
    <div>
      <form onSubmit={handleAddPlace}>
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
        <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

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
  )
}

export default PlacesFormPage