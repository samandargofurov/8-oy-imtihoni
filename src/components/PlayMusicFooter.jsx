import { CiHeart } from "react-icons/ci";
import propertyHover from '../assets/Property_Hover.svg'
import volume from '../assets/volume.svg'

function PlayMusicFooter() {
    return (
        <>
            <div className='bg-gray-900 px-6 justify-between pt-1 flex bottom-0 fixed text-white h-16 w-full'>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold text-lg">Play it safe</p>
                            <h3 className="text-gray-400">chill mix</h3>
                        </div>
                        <span className="text-3xl"><CiHeart /></span>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <img src={propertyHover} alt="" width={36} height={36} />
                        <div className="flex gap-1">
                            <span className="text-sm">02:37</span>
                            <input type="range" />
                            <span className="text-sm">04:42</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <img src={volume} alt="" />
                        <input type="range" name="" id="" />
                    </div>
            </div>
        </>
    )
}

export default PlayMusicFooter