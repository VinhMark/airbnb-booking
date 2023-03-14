import { useState } from "react";
import axios from 'axios';

const PhotosUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState('')

  async function addPhotoLink(ev) {
    ev.preventDefault();
    const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos(prev => [...prev, fileName])
    setPhotoLink('');
  }

  function uploadPhoto(ev) {
    const formData = new FormData()
    const files = ev.target.files
    for (let i = 0; i < files.length; i++) {
      formData.append('photo', files[i])
    }

    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      setAddedPhotos(prev => [...prev, ...res.data])
      console.log(res.data)
    })
  }

  return (
    <>
      <div className="flex gap-2">
        <input type="text" placeholder="Link image....." value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
        <button onClick={addPhotoLink} className="px-4 whitespace-nowrap rounded-2xl">Add image</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map((photo, i) => (
          <div className="rounded-2xl overflow-hidden" key={i} >
            <img src={`http://localhost:4000/uploads/${photo}`} alt="" />
          </div>
        ))}

        <label className="p-8 cursor-pointer text-gray-500 rounded-2xl bg-transparent border flex justify-center gap-1 font-bold items-center">
          <input type="file" className="hidden" onChange={uploadPhoto} multiple />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}

export default PhotosUploader