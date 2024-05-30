import userPlus from '../assets/UserPlus_S.svg'
import close from '../assets/Close_S.svg'
import infoGhost from '../assets/infoGhost.svg'

function RightSidebar() {
  return (
    <>
        <div className="w-[400px] bg-black min-h-[100vh] text-white">
            <div className="pr-6 pl-6 pt-7">
                <div className='flex justify-between items-center'>
                    <h4 className='text-md'>Friend Activity</h4>
                    <div className='flex items-center gap-2'>
                        <span className='cursor-pointer'><img src={userPlus} alt="" width={23} height={23} /></span>
                        <span className='cursor-pointer'><img src={close} alt="" width={42} height={42} /></span>
                    </div>
                </div>
                <div className='flex flex-col gap-6 mt-6'>
                    <p className='text-sm'>Let friends and followers on Spotify see what you’re listening to.</p>
                    <div className='flex flex-col gap-5'>
                        <img src={infoGhost} alt="" width={150} height={52} />
                        <img src={infoGhost} alt="" width={150} height={52} />
                        <img src={infoGhost} alt="" width={150} height={52} />
                    </div>
                    <p className='text-sm mt-2'>Go to Settings Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
                    <button className='bg-white text-black font-bold rounded-[50px] py-4'>SETTINGS</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default RightSidebar