import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import back from '../assets/Back.svg';
import forward from '../assets/Forward.svg';
import bigGreenPlay from '../assets/Play_GreemHover.svg';
import freeHeart from '../assets/freeHeart.svg';
import search_S from '../assets/Search_S.svg';
import clock from '../assets/clock.svg';
import download from '../assets/Download_XS.svg';
import { NavLink, useParams } from 'react-router-dom';

function Music() {
  const [playlistUser, setPlaylistUser] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const params = useParams();
  const token = useSelector((state) => state.auth.token);

  const newData = playlistUser?.tracks?.items;

  useEffect(() => {
    if (params.id) {
      fetch(`${import.meta.env.VITE_API_MUSIC}${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPlaylistUser(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [params.id, token]);

  const playMusic = (track) => {
    if (audioRef.current) {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setCurrentTrack(null);
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        audioRef.current.src = track.preview_url; // Use preview_url or any valid URL for the track
        audioRef.current.play();
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    }
  };


  return (
    <div className='background w-full'>
      <audio ref={audioRef} />
      <div className='pb-24 text-white'>
        <div className='shadow-2xl mb-7 yellow'>
          <div className='container mx-auto w-[835px] flex items-center gap-3 pt-2 pb-2'>
            <NavLink to='/'><span className='transition-all duration-200 hover:opacity-85'><img src={back} alt="" /></span></NavLink>
            <NavLink to='/likes'><span className='transition-all duration-200 hover:opacity-85'><img src={forward} alt="" /></span></NavLink>
          </div>
        </div>
        <div className='container mx-auto w-[835px]'>
          <div className='backgroundGradient'>
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
          </div>

          <div className='mt-10'>
            <div className='flex justify-between'>
              <div className='flex items-center text-center gap-3'>
                <span className='cursor-pointer' onClick={() => playMusic(currentTrack)}>
                  <img src={bigGreenPlay} alt="" width={80} height={80} />
                </span>
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
            <div className='container mx-auto w-[800px]'>
              <div className='flex flex-col gap-6'>
                <div className='flex justify-between border-b-2 pb-3 text-gray-300'>
                  <div className='flex gap-4 items-center'>
                    <span className='text-xl pl-3'>#</span>
                    <h5>TITLE</h5>
                  </div>
                  <h4>ALBUM</h4>
                  <h3>DATE ADDED</h3>
                  <span className='pr-7'><img src={clock} alt="" width={18} height={18} /></span>
                </div>
                {newData && newData.map((el, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center gap-4 pr-7 cursor-pointer ${currentTrack?.id == el.track.id && isPlaying ? 'bg-green-400' : ''}`}
                    onClick={() => playMusic(el.track)}
                  >
                    <div className='flex items-center gap-[65px]'>
                      <div className='flex gap-5 items-center'>
                        <span className='pl-1'>{index + 1}</span>
                        <div className='flex gap-4'>
                          <img src={el?.track?.album?.images[2]?.url} alt="" width={64} height={64} />
                          <div className='flex flex-col gap-1 w-20'>
                            <h2 className='text-xs'>{el?.track?.name}</h2>
                            <h3 className='text-xs'>{el?.track?.album?.name}</h3>
                          </div>
                        </div>
                      </div>
                      <p>Play It Safe</p>
                    </div>
                    <div className='flex gap-10 items-center'>
                      <span onClick={handleChangeIcon}><img src={freeHeart} alt="" /></span>
                      <span className='text-lg font-semibold'>{el?.track?.duration_ms && new Date(el.track.duration_ms).toISOString().substring(14, 19)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Music;
