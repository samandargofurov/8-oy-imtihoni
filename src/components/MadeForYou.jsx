import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from './utils';
import { create } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function MadeForYou() {
  const [madeForYou, setMadeForYou] = useState([])
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleFetch = (limit = 4) => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_MADE_FOR_YOU}?limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMadeForYou(data.playlists.items);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getToken()
        .then((res) => {
          dispatch(create(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  useEffect(() => {
    handleFetch();
  }, [token]);

  function handleRedirect() {
    navigate(`playlist/${data?.id}`)
  }

  return (
    <>
      <div className='flex flex-col gap-6 mt-8'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>Made for you</h1>
          <button onClick={() => handleFetch(10)}>SEE ALL</button>
        </div>
        <div className='flex flex-wrap gap-4'>
          {madeForYou?.length > 0 &&
            madeForYou?.map((el, index) => {
              return (
                <div key={index} onClick={handleRedirect}>
                  <div className="w-[192px] h-[300px] overflow-clip bg-[#1B1B1B] p-4 rounded-xl">
                    <img src={el?.images[0]?.url} alt="" width={162} height={162} className='rounded-md' />
                    <h4 className='pt-5 pb-2 font-semibold'>{el?.name}</h4>
                    <p className='text-[#b3b3b3] text-sm'>{el?.description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default MadeForYou