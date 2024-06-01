import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import back from '../assets/Back.svg';
import forward from '../assets/Forward.svg';
import bigGreenPlay from '../assets/Play_GreemHover.svg';
import freeHeart from '../assets/freeHeart.svg';
import search_S from '../assets/Search_S.svg'
import screen from '../assets/Screenshot 2022-06-04 at 20.05.png'
import clock from '../assets/clock.svg'
// import bigGreenPause from '../assets/Pause_GreemHover.svg';
import download from '../assets/Download_XS.svg';
import { NavLink, useParams } from 'react-router-dom';

function Music() {
  const [playlistUser, setPlaylistUser] = useState(null);
  const params = useParams();
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
          console.log(data)
          setPlaylistUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id, token]);

  return (
    <div className='background w-full'>
      <div className='pb-20 text-white'>
        <div className='shadow-2xl mb-7'>
          <div className='container mx-auto w-[835px] flex items-center gap-3 pt-2 pb-2'>
            <NavLink to='/'><span className='transition-all duration-200 hover:opacity-85'><img src={back} alt="" /></span></NavLink>
            <NavLink to='/likes'><span className='transition-all duration-200 hover:opacity-85'><img src={forward} alt="" /></span></NavLink>
          </div>
        </div>
        <div className='container mx-auto w-[835px]'>
          {playlistUser && (
            <div className='flex gap-10 items-center'>
              <img
                src={playlistUser.images[0].url}
                alt=""
                width={220}
                height={220}
              />
              <div className='flex flex-col gap-3'>
                <span className='font-semibold text-lg'>{playlistUser.type}</span>
                <h3 className='text-5xl font-bold'>{playlistUser.name}</h3>
                <p className='pt-4'>{playlistUser.description}</p>
                <div className='flex gap-3'>
                  <p className='font-semibold'>{playlistUser.tracks.total} songs</p>
                </div>
              </div>
            </div>
          )}

          <div className='mt-10'>
            <div className='flex justify-between'>
              <div className='flex items-center text-center gap-3'>
                <span className='cursor-pointer'><img src={bigGreenPlay} alt="" width={80} height={80} /></span>
                <span className='cursor-pointer'><img src={freeHeart} alt="" width={28} height={28} /></span>
                <span className='cursor-pointer'><img src={download} alt="" width={36} height={36} /></span>
                <span className='text-3xl cursor-pointer'>•••</span>
              </div>
              <div className='flex gap-3 items-center'>
                <span className='cursor-pointer'><img src={search_S} alt="search-icon" width={22} height={22} /></span>
                <select name="" id="1" className='border-none outline-none bg-transparent'>
                  <option value="1" className='text-black'>Custom order</option>
                  <option value="2" className='text-black'>Custom order 2</option>
                  <option value="3" className='text-black'>Custom order 3</option>
                </select>
              </div>
            </div>
          </div>

          <div>

            <div className='container mx-auto w-[780px]'>
              <div className='flex flex-col gap-6'>
                <div className='flex justify-between border-b-2 pb-3'>
                  <div className='flex gap-4 items-center'>
                    <span className='text-xl'>#</span>
                    <h5>TITLE</h5>
                  </div>
                  <h4>ALBUM</h4>
                  <h3>DATE ADDED</h3>
                  <img src={clock} alt="" width={18} height={18} />
                </div>

                <div className='flex justify-between items-center gap-4'>
                  <div className='flex gap-5 items-center'>
                  <span>1</span>
                    <div className='flex gap-4'>
                    <img src={screen} alt="" />
                    <div className='flex flex-col gap-1'>
                      <h2 className='text-sm'>Play It Safe</h2>
                      <h3 className='text-sm'>Julia Wolf</h3>
                    </div>
                    </div>
                  </div>
                    <p>Play It Safe</p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
