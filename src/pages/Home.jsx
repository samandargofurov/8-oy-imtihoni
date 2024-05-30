import { NavLink } from 'react-router-dom'
import back from '../assets/Back.svg'
import forward from '../assets/Forward.svg'
import HomePlayList from '../components/HomePlayList'

function Home() {
  return (
    <>
      <div className='w-full'>
        <div className='gradient min-h-[230vh]'>
          <div className="px-8 pt-4 pb-4  text-white">
            <div className='flex flex-col'>
              <div className='flex items-center gap-3 pt-2'>
                <NavLink to='/'><img src={back} alt="" /></NavLink>
                <NavLink to='/'><img src={forward} alt="" /></NavLink>
              </div>
              <h2 className='text-4xl font-bold pt-8 pb-8'>Good afternoon</h2>
                <HomePlayList></HomePlayList>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home