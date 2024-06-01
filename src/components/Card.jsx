import { useNavigate } from 'react-router-dom'

function Card({dd}) {
  const navigate = useNavigate()

  function handleRedirect() {
    navigate(`playlist/${dd?.id}`)
  }

  return (
    <>
      <div onClick={handleRedirect}>
        <div className="w-[192px] h-[300px] overflow-clip bg-[#1B1B1B] p-4 rounded-xl cursor-pointer">
          <img src={dd?.images[0]?.url} alt="" width={162} height={162} className='rounded-md' />
          <h4 className='pt-5 pb-2 font-semibold'>{dd?.name}</h4>
          <p className='text-[#b3b3b3] text-sm'>{dd?.description}</p>
        </div>
      </div>
    </>
  )
}

export default Card