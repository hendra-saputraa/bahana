import React, { useState } from 'react';
import { IoTrash } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { 
  getAllSongs, 
  getAllAlbums, 
  getAllArtists, 
  deleteSongById, 
  deleteAlbumById, 
  deleteArtistById 
} from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { storage } from '../config/firebase.config';
import { ref, deleteObject } from 'firebase/storage';

const SongCard = ({ data, index, type }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [{ alertType, allArtists, allAlbums, allSongs, isSongPlaying, songIndex }, dispatch] = 
    useStateValue();
  
  const deleteItem = (data) => {
    if (type === "song") {
      const deleteRef = ref(storage, data.imageURL);
      
      deleteObject(deleteRef).then(() => {});
      
      deleteSongById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          
          getAllSongs().then((data) => {
            console.log(data.song);
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.song,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "failed",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }
    
    // Album
    if (type === "album") {
      const deleteRef = ref(storage, data.imageURL);
      
      deleteObject(deleteRef).then(() => {});
      
      deleteAlbumById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          
          getAllAlbums().then((data) => {
            dispatch({
              type : actionType.SET_ALL_ALBUMS,
              allAlbums : data.album,
            });
          });
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "failed",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }
    
    // Artist
    if (type === "artist") {
      const deleteRef = ref(storage, data.imageURL);
      
      deleteObject(deleteRef).then(() => {});
      
      deleteArtistById(data._id).then((res) => {
        if (res.data) {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "success",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
          
          getAllArtists().then((data) => {
            dispatch({
              type : actionType.SET_ALL_ARTISTS,
              allArtists : data.artist,
            });
          });
          
        } else {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: "failed",
          });
          setTimeout(() => {
            dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
            });
          }, 4000);
        }
      });
    }
  };
  
  const addToContext = () => {
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
    <motion.div 
      className="relative w-40 min-w-210 px-2 py-4 cursor-pointer bg-card hover:bg-gray-700 rounded-lg flex flex-col items-center" 
      onClick={type === "song" && addToContext}
    >
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-md relative overflow-hidden">
        <motion.img 
          whileHover={{ scale : 1.05 }}
          src={data.imageURL} 
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      
      <p className="text-base text-center text-gray-300 font-semibold my-2">
        {data.name.length > 25 ? `${data.name.slice(0,25)}...` : data.name}
        {data.artist && (
          <span className="block text-sm text-color my-1">
            {data.artist.length > 25 
              ? `${data.artist.slice(0,25)}...` 
              : data.artist}
          </span>
        )}
      </p>
      
      <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
        <motion.i 
          whileTap={{ scale : 0.75 }} 
          className="text-base text-red-600 drop-shadow-md hover:text-red-400" 
          onClick={() => setIsDeleted(true)} 
        >
          <IoTrash />
        </motion.i>
      </div>
      
      {isDeleted && (
        <motion.div 
          className="absolute inset-0 backdrop-blur-md bg-card flex flex-col items-center justify-center px-4 py-2 gap-0"
          initial={{ opacity : 0 }}
          animate={{ opacity : 1 }}
        >
          <p className="text-lg text-headingColor font-semibold text-center">
            Item ini akan terhapus, apakah anda yakin?
          </p>
        
          <div className="flex items-center gap-4">
            <motion.button 
              className="px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer" 
              whileTap={{ scale : 0.7 }} 
              onClick={() => setIsDeleted(false)}
            >
              Tidak
            </motion.button>
            <motion.button 
              className="px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer" 
              whileTap={{ scale : 0.7 }} 
              onClick={() => deleteItem(data)}
            >
              Ya
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SongCard;
