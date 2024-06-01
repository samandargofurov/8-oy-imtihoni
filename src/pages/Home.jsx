import { NavLink } from 'react-router-dom'
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import HomePlayList from '../components/HomePlayList'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getToken } from '../components/utils'
import MadeForYou from '../components/MadeForYou'
import RecentlyPlayed from '../components/RecentlyPlayed'
import JumpBackIn from '../components/JumpBackIn'
import UniquelyYours from '../components/UniquelyYours'


function Home() {
  const [topMix, setTopMix] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleFetch = (limit = 4) => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_YOUR_TOP_MIXES}?limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTopMix(data.playlists.items);
        })
        .catch((err) => {
          console.log(err);
        })
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

  return (
    <>
    <div className='gradient w-full'>
        <div className='container mx-auto w-[835px]'>
          <div className='flex justify-center'>
            <div>
              <div className="px-2 pt-4 pb-20 text-white">
                <div className='flex flex-col'>
                  <div className='flex items-center gap-3 pt-2'>
                    <NavLink to='/likes'><span className='transition-all duration-200 hover:opacity-85'><img src={back} alt="" /></span></NavLink>
                    <NavLink to='/'><span className='transition-all duration-200 hover:opacity-85'><img src={forward} alt="" /></span></NavLink>
                  </div>
                  <h2 className='text-3xl font-bold pt-8 pb-8'>Good afternoon</h2>
                  <HomePlayList></HomePlayList>

                  
                      {/* Your top mixes */}
                      <div className='mt-12 flex flex-col gap-6'>
                        <div className='flex justify-between'>
                          <h1 className='text-2xl font-semibold'>Your top mixes</h1>
                          <button onClick={() => handleFetch(10)}>SEE ALL</button>
                        </div>
                        <div className='flex gap-6'>
                          <div className='flex flex-wrap gap-4'>
                            {topMix && topMix.map((el, index) => (
                              <Card key={index} dd={el}></Card>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Made for you */}
                      <MadeForYou></MadeForYou>

                      {/* Recently played */}
                      <RecentlyPlayed></RecentlyPlayed>

                      {/* Jump back in */}
                      <JumpBackIn></JumpBackIn>

                      {/* Uniquely yours */}
                      <UniquelyYours />
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
