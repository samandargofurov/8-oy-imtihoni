import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Music() {
  const [playlistUser, setPlaylistUser] = useState(null);
  const params = useParams();
  console.log(params)
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (params.id) {
      fetch(`${import.meta.env.VITE_API_MUSIC}${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylistUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);


  
  return (
    <div className='w-full'>
      {playlistUser && (
            <div>
              <img
                src={playlistUser.images[0].url}
                alt=""
                width={200}
                height={200}
              />
              <div>
                <span>{playlistUser.type}</span>
                <h3>{playlistUser.name}</h3>
                <p>{playlistUser.description}</p>
              </div>
            </div>
          )}
    </div>
  )
}

export default Music