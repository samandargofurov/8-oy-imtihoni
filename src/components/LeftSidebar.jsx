import { NavLink } from 'react-router-dom'
import homeSvg from '../assets/Home_Fill_S.svg'
import searchSvg from '../assets/Search_S.svg'
import librarySvg from '../assets/Library_S.svg'
import createPlaylist from '../assets/createPlaylist.svg'
import likedSongs from '../assets/Liked_Songs_S.svg'

function LeftSidebar() {
    return (
        <>
            <div className="w-[340px] bg-black min-h-[100vh]">
                <div className='pt-7 pl-6 pr-6 fixed'>
                    <div className='flex flex-col gap-8 pb-5 border-b-2 border-[#282828]'>
                        <div className="flex flex-col gap-2">
                            <div className='flex gap-2'><img src={homeSvg} alt="" width={24} height={24} /><span className='text-[#B2B2B2] transition-all duration-500 hover:text-white font-semibold cursor-pointer w-36'><NavLink to='/'>Home</NavLink></span></div>
                            <div className='flex gap-2'><img src={searchSvg} alt="" width={24} height={24} /><h1 className='text-[#B2B2B2] transition-all duration-500 hover:text-white font-semibold cursor-pointer w-36'>Search</h1></div>
                            <div className='flex gap-2'><img src={librarySvg} alt="" width={24} height={24} /><h1 className='text-[#B2B2B2] transition-all duration-500 hover:text-white font-semibold cursor-pointer w-36'>Your Library</h1></div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className='flex gap-2'><img src={createPlaylist} alt="" width={24} height={24} /><span className='text-[#B2B2B2] transition-all duration-500 hover:text-white font-semibold cursor-pointer w-36'>Create Playlist</span></div>
                            <div className='flex gap-2'><img src={likedSongs} alt="" width={24} height={24} /><h1 className='text-[#B2B2B2] transition-all duration-500 hover:text-white font-semibold cursor-pointer w-36'><NavLink to='/likes'>Liked Songs</NavLink></h1></div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 mt-4 text-white text-xs'>
                        <p className='cursor-pointer'>Chill Mix</p>
                        <p className='cursor-pointer'>Insta Hits</p>
                        <p className='cursor-pointer'>Your Top Songs 2021</p>
                        <p className='cursor-pointer'>Mellow Songs</p>
                        <p className='cursor-pointer'>Anime Lofi & Chillhop Music</p>
                        <p className='cursor-pointer'>BG Afro “Select” Vibes</p>
                        <p className='cursor-pointer'>Afro “Select” Vibes</p>
                        <p className='cursor-pointer'>Happy Hits!</p>
                        <p className='cursor-pointer'>Deep Focus</p>
                        <p className='cursor-pointer'>Instrumental Study</p>
                        <p className='cursor-pointer'>OST Compilations</p>
                        <p className='cursor-pointer'>Nostalgia for old souled mill...</p>
                        <p className='cursor-pointer'>Mixed Feelings</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftSidebar