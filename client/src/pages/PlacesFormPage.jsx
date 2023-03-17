import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AccountNav from '../AccountNav';
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";

const PlacesFormPage = () => {
  const { id } = useParams();

  const [photosRemove, setPhotosRemove] = useState([]);
  const [placeDataForm, setPlaceDataForm] = useState({
    address: "",
    addedPhotos: [],
    description: "",
    perks: [],
    extraInfo: "",
    checkIn: 0,
    checkOut: 0,
    maxGuests: 0,
    price: 0,
    title: ""
  })

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get('/places/' + id).then(res => {
        const placeRes = res.data;
        placeRes.addedPhotos = placeRes.photos;
        setPlaceDataForm(res.data)
      })
    }
  }, [])


  function preInput(header, description) {
    return (
      <div>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    )
  }

  async function handleSavePlace(e) {
    e.preventDefault();
    if (id) {
      await axios.put('/places', { id, ...placeDataForm });
    } else {
      const { data } = await axios.post('/places', placeDataForm)
      console.log(data)
    }

    // check delete photo uploaded
    if (photosRemove) {
      await axios.post('/remove-image', photosRemove)
    }
    navigate('/account/places')
  }

  function handleChangeInput(ev) {
    setPlaceDataForm(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSavePlace}>
        {/* Title */}
        {preInput('Title', 'Tittle for your place. should be short and catchy as in advertisement.')}
        <input type="text" placeholder="title, for example: My lovely apt"
          value={placeDataForm.title} name='title' onChange={handleChangeInput} />

        {/* Address */}
        {preInput('Address', 'Address for your place.')}
        <input type="text" placeholder="title, for example: My lovely apt"
          name='address' value={placeDataForm.address} onChange={handleChangeInput} />

        {/* Photos */}
        {preInput('Photos', 'more = better')}
        <PhotosUploader
          addedPhotos={placeDataForm.addedPhotos}
          setPhotosRemove={setPhotosRemove}
          setAddedPhotos={setPlaceDataForm}
        />

        {/* Description */}
        {preInput('Description', 'Description of place')}
        <textarea value={placeDataForm.description} name="description" onChange={handleChangeInput} />

        {/* Perks */}
        {preInput('Perks', 'Perks of place')}
        <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={placeDataForm.perks} onChange={setPlaceDataForm} />
        </div>

        {/* Perks */}
        {preInput('Check in&out times', 'add check in and out times, remember to some time window cleaning')}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3>Check in time</h3>
            <input type="number" placeholder="14:00" value={placeDataForm.checkIn} name="checkIn"
              onChange={handleChangeInput} />
          </div>
          <div>
            <h3>Check out time</h3>
            <input type="number" placeholder="17:00" value={placeDataForm.checkOut} name="checkOut"
              onChange={handleChangeInput} />
          </div>
          <div>
            <h3>Max guest</h3>
            <input type="number" placeholder="2" value={placeDataForm.maxGuests} name="maxGuests"
              onChange={handleChangeInput} />
          </div>
          <div>
            <h3>Price</h3>
            <input type="number" placeholder="99" value={placeDataForm.price} name="price"
              onChange={handleChangeInput} />
          </div>

        </div>
        {/* Extra info */}
        {preInput('Extra info', 'House rules, etc')}
        <textarea value={placeDataForm.extraInfo} name="extraInfo" onChange={handleChangeInput} />

        {/* button */}
        <button className="bg-primary text-white border my-1 px-3 py-2 w-full rounded-2xl">Save</button>
      </form>
    </div>
  )
}

export default PlacesFormPage