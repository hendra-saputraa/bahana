import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);
  const [{ artistFilter, albumFilter, languageFilter, filterTerm }, dispatch] = useStateValue();
  
  const updateFilterButton = (name) => {
    setFilterMenu(false);
    setFilterName(name);
    
    if (flag === "Artis") {
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
    }
    
    if (flag === "Album") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }
    
    if (flag === "Bahasa") {
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
    }
    
    if (flag === "Kategori") {
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
    }
  };
  return (
    <div className="border border-gray-400 rounded-md px-4 py-1 relative text-white cursor-pointer hover:border-gray-300">
      <p 
        className="text-base tracking-wide text-white flex items-center gap-2" 
        onClick={() => setFilterMenu(!filterMenu)} 
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 13 
              ? `${filterName.slice(0,12)}...` 
              : filterName}
          </>
        )}
        
        <IoChevronDown 
          className={`text-base text-white duration-150 transition-all ease-in-out ${
              filterMenu ? "rotate-180" : "rotate-0"
            }`} 
        />
      </p>
      {filterData && filterMenu && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 50 }} 
          className="w-48 z-50 backdrop-blur-sm bg-card max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-card text-white scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md shadow-zinc-800 absolute top-8 left-0"
        >
          {filterData?.map((data) => (
            <div 
              key={data.name} 
              className="flex items-center text-white gap-2 px-4 py-1 hover:bg-gray-200"
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === "Artis" || flag === "Album") && (
                <img 
                  src={data.imageURL} 
                  className="w-8 min-w-[32px] h-8 rounded-md object-cover" 
                />
              )}
              <p className="w-full text-white">
                {data.name.length > 13 
                  ? `${data.name.slice(0,13)}...` 
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
