import { useState } from "react";
import axios from 'axios';

const PhotosUploader = ({ addedPhotos, setAddedPhotos, setPhotosRemove }) => {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoLink(ev) {
    ev.preventDefault();
    const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos(prev => ({ ...prev, addedPhotos: [...addedPhotos, fileName] }))
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
      setAddedPhotos(prev => ({ ...prev, addedPhotos: [...addedPhotos, ...res.data] }))
    })
  }

  function handleRemovePhoto(e, photo) {
    e.preventDefault();
    setPhotosRemove(prev => [...prev, photo])
    setAddedPhotos(prev => ({ ...prev, addedPhotos: [...addedPhotos.filter(i => i !== photo)] }));
  }

  function selectAsMainPhoto(e, photo) {
    e.preventDefault();
    setAddedPhotos(prev => ({ ...prev, addedPhotos: [photo, ...addedPhotos.filter(i => i !== photo)] }))
  }

  return (
    <>
      <div className="flex gap-2">
        <input type="text" placeholder="Link image....." value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
        <button onClick={addPhotoLink} className="px-4 whitespace-nowrap rounded-2xl">Add image</button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map((photo, i) => (
          <div className="rounded-2xl overflow-hidden relative" key={i} >
            <img src={`http://localhost:4000/uploads/${photo}`} alt="" className="object-cover" />

            <button onClick={e => handleRemovePhoto(e, photo)} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-60 px-1 rounded-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button onClick={e => selectAsMainPhoto(e, photo)} className="absolute bottom-1 left-1 text-white bg-black bg-opacity-60 px-1 rounded-full cursor-pointer">
              {photo === addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              )}
              {photo !== addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              )}
            </button>
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