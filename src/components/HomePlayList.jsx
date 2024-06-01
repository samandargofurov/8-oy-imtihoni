// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { getToken } from "../components/utils";
// import { create } from "../redux/authSlice";
// import { useDispatch, useSelector } from 'react-redux';

// function HomePlayList() {
//     const [featured, setFeatured] = useState([]);
//     const token = useSelector((state) => state.auth.token);
//     const dispatch = useDispatch();
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (token) {
//             fetch(`${import.meta.env.VITE_API_HOME_FEATURED_PLAYLIST}browse/featured-playlists?limit=6`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     setFeatured(data.playlists.items);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         } else {
//             getToken()
//                 .then((res) => {
//                     dispatch(create(res));
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         }
//     }, [token]);


//     function handleRedirect() {
//         navigate(`playlist/${el?.id}`)
//     }

//     return (
//         <>
//             <div>
//                 <div className='flex flex-wrap gap-4'>
//                     {featured?.length > 0 &&
//                         featured?.map((el, index) => {
//                             return (
//                                     <div key={index} className='flex items-center gap-6 bg-[#3A3A77] w-[400px] rounded-lg cursor-pointer' onClick={handleRedirect}>
//                                         <img className='rounded-tl-lg rounded-bl-lg' src={el?.images[0]?.url} alt="" width={72} height={72} />
//                                         <span className='text-lg font-semibold'>{el.name}</span>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>
//         </>
//     )
// }

// export default HomePlayList


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from "../components/utils";
import { create } from "../redux/authSlice";
import { useDispatch, useSelector } from 'react-redux';

function HomePlayList() {
    const [featured, setFeatured] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            fetch(`${import.meta.env.VITE_API_HOME_FEATURED_PLAYLIST}browse/featured-playlists?limit=6`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setFeatured(data.playlists.items);
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
    }, [token]);

    function handleRedirect(id) {
        navigate(`playlist/${id}`);
    }

    return (
        <div>
            <div className='flex flex-wrap gap-4'>
                {featured?.length > 0 &&
                    featured?.map((el, index) => (
                        <div
                            key={index}
                            className='flex items-center gap-6 bg-[#3A3A77] w-[400px] rounded-lg cursor-pointer'
                            onClick={() => handleRedirect(el.id)}
                        >
                            <img
                                className='rounded-tl-lg rounded-bl-lg'
                                src={el?.images[0]?.url}
                                alt=""
                                width={72}
                                height={72}
                            />
                            <span className='text-lg font-semibold'>{el.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HomePlayList;
