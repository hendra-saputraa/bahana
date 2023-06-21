import React, { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { getAllUsers, getAllArtists, getAllAlbums, getAllSongs } from '../api';
import { FaUsers } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi';
import { RiUserStarFill } from 'react-icons/ri';

export const DashboardCard = ({ icon, name, count }) => {
  return (
    <div className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-card flex flex-col items-center justify-center">
      {icon}
      <p className="text-xl text-white font-semibold">{ name }</p>
      <p className="text-xl text-white">{ count }</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtists, allAlbums }, dispatch] = useStateValue();
  
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type : actionType.SET_ALL_USERS,
          allUsers : data.data,
        });
      });
    }
    
    if (!allArtists) {
      getAllArtists().then((data) => {
        dispatch({
          type : actionType.SET_ALL_ARTISTS,
          allArtists : data.artist,
        });
      });
    }
    
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type : actionType.SET_ALL_ALBUMS,
          allAlbums : data.album,
        });
      });
    }
    
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type : actionType.SET_ALL_SONGS,
          allSongs : data.song,
        });
      });
    }
    
  }, [])
  
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard icon={<FaUsers className="text-3xl text-white" />} name={"Users"} count={allUsers?.length > 0 ? allUsers?.length : 0} />
      <DashboardCard icon={<GiLoveSong className="text-3xl text-white" />} name={"Lagu"} count={allSongs?.length > 0 ? allSongs?.length : 0} />
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-white" />} name={"Artis"} count={allArtists?.length > 0 ? allArtists?.length : 0} />
      <DashboardCard icon={<GiMusicalNotes className="text-3xl text-white" />} name={"Album"} count={allAlbums?.length > 0 ? allAlbums?.length : 0} />
    </div>
  );
};

export default DashboardHome;
