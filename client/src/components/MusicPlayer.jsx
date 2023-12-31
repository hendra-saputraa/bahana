import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getAllSongs } from '../api';

import { RiPlayListFill } from 'react-icons/ri';
import { IoClose, IoMusicalNote } from 'react-icons/io5';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MusicPlayer = () => {
  const nextTrack = () => {
    if (songIndex > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex + 1,
      });
    }
  };
  
  const previousTrack = () => {
    if (songIndex === 0) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: songIndex - 1,
      });
    }
  };
  
  const closePlayer = () => {
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: false,
    });
  };
  
  const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();
  const [isPlaylist, setIsPlaylist] = useState(false);
  return (
    <div className="w-full flex items-center gap-3 bg-card">
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img 
          src={allSongs[songIndex]?.imageURL} 
          alt="" 
          className="w-40 h-20 object-cover rounded-md" 
        />
        
        <div className="flex items-start flex-col">
          <p className="text-xl text-white font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{" "}
            <span className="text-base text-color">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-color">
            {allSongs[songIndex]?.artist}{" "}
            <span className="text-sm text-color font-semibold">
              ({allSongs[songIndex]?.category})
            </span>
          </p>
          
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlaylist(!isPlaylist)}
          >
            <RiPlayListFill className="text-white hover:text-headingColor text-3xl cursor-pointer" />
          </motion.i>
        </div>
        
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songURL}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        
        {isPlaylist && <PlaylistCard />}
        
        <IoClose 
          onClick={closePlayer} 
          className="text-color" 
        />
      </div>
    </div>
  );
};

export const PlaylistCard = () => {
  const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();
  
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type : actionType.SET_ALL_SONGS,
          allSongs : data.song,
        });
      });
    }
  }, []);
  
  const setCurrentPlaySong = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    
    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };
  
  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md shadow-zinc-800 bg-card">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group w-full p-4 hover:bg-primary text-white flex gap-3 items-center cursor-pointer" 
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="text-color group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="text-lg text-color font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-color">
                {music?.artist}{" "}
                <span className="text-sm text-color font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
