import heart from '../assets/heart.svg';
import freeHeart from '../assets/freeHeart.svg';
import volume from '../assets/volume.svg';
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import rectangel from '../assets/Rectangle.svg';
import pauseIcon from '../assets/Subtract.svg';
import playIcon from '../assets/Property_Hover.svg';

function PlayMusicFooter() {
    const [playlistUserFooter, setPlaylistUserFooter] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [liked, setLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volumeLevel, setVolumeLevel] = useState(1);
    const audioRef = useRef(null);
    const params = useParams();
    const token = useSelector((state) => state.auth.token);

    const savePlaylistToLocalStorage = (playlist) => {
        const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        savedPlaylists.push(playlist);
        localStorage.setItem('playlists', JSON.stringify(savedPlaylists));
    };

    const removePlaylistFromLocalStorage = (playlistId) => {
        let savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        savedPlaylists = savedPlaylists.filter(playlist => playlist.id !== playlistId);
        localStorage.setItem('playlists', JSON.stringify(savedPlaylists));
    };

    const isPlaylistInLocalStorage = (playlistId) => {
        const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
        return savedPlaylists.some(playlist => playlist.id === playlistId);
    };

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
                setPlaylistUserFooter(data);
                if (audioRef.current) {
                    audioRef.current.src = data.tracks.items[0]?.track.preview_url;
                }
                setLiked(isPlaylistInLocalStorage(data.id));
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [params.id, token]);

    function formattedTime(duration_ms) {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = Math.floor((duration_ms % 60000) / 1000);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
    }

    function handlePlayMusic() {
        if (audioRef.current.src) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    function handleTimeUpdate() {
        setCurrentTime(audioRef.current.currentTime * 1000);
    }

    function handleVolumeChange(e) {
        const volume = e.target.value;
        audioRef.current.volume = volume;
        setVolumeLevel(volume);
    }

    function handleAutoFill() {
        if (playlistUserFooter) {
            if (liked) {
                removePlaylistFromLocalStorage(playlistUserFooter.id);
            } else {
                savePlaylistToLocalStorage(playlistUserFooter);
            }
            setLiked(!liked);
        }
    }

    return (
        <div className='bg-gray-900 px-6 flex justify-between items-center bottom-0 fixed text-white h-16 w-full'>
            <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>

            <div className="flex items-center gap-2">
                {playlistUserFooter && (
                    <div className="flex flex-col w-56">
                        <p className="text-xs font-bold">{playlistUserFooter.description}</p>
                        <h3 className="text-[10px]">{playlistUserFooter.name}</h3>
                    </div>
                )}
                <span className="text-3xl" onClick={handleAutoFill}>
                    <img src={liked ? heart : freeHeart} alt="heart/freeHeart" />
                </span>
            </div>

            <div className="flex flex-col justify-center items-center">
                <span onClick={handlePlayMusic} className="cursor-pointer">
                    <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" width={35} height={35} />
                </span>
                <div className="flex items-center gap-2">
                    <span>{formattedTime(currentTime)}</span>
                    <span><img src={rectangel} alt="" /></span>
                    <span>0:29</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <img src={volume} alt="Volume Icon" />
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volumeLevel} 
                    onChange={handleVolumeChange} 
                    className="appearance-none bg-gray-600 h-1 w-24 rounded-full" 
                />
            </div>            
        </div>
    );
}

export default PlayMusicFooter;
