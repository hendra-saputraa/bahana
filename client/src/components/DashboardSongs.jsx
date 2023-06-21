import React from 'react';
import SongCard from './SongCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5';
import { AiOutlineClear } from 'react-icons/ai';

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{allSongs}, dispatch] = useStateValue();
  
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        console.log(data.song);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        });
      });
    }
  }, []);
  
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink 
          to={"/dashboard/newSong"} 
          className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md hover:shadow-zinc-400 cursor-pointer"
        >
          <IoAdd className="text-white text-xl" />
        </NavLink>
        
        <input 
          type="text" 
          placeholder="Cari Disini..." 
          value={songFilter} 
          onChange={(e) => setSongFilter(e.target.value)} 
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => setIsFocus(true)}
          className={`w-full px-4 py-2 border ${
              isFocus ? "border-gray-500 shadow-md shadow-zinc-400" : "border-gray-300"
            } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-color`}
        />
        
        <i>
          <AiOutlineClear className="text-3xl text-white cursor-pointer" />
        </i>
      </div>
      
      {/* Main Content */}
      <div className="relative w-full my-4 p-4 py-15 border border-gray-300 rounded-md">
        {/* Count Songs */}
        <div className="absolute top-4 left-4">
          <p className="text-xl text-white font-bold">
            <span className="text-sm font-semibold text-white">
              Jumlah :{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>
        
        <SongContainer data={allSongs} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && 
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} type="song" />
        ))}
    </div>
  );
};

export default DashboardSongs;
