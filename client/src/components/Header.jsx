import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Logo } from '../assets/img';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { FaCrown } from 'react-icons/fa';
import { useStateValue } from '../context/StateProvider';

import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';

import { motion } from 'framer-motion';

const Header = () => {
  const [{user}, dispatch] = useStateValue()
  const [isMenu, setIsMenu] = useState(false);
  
  const navigate = useNavigate()
  
  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((e) => console.log(e));
    navigate("/login", {replace : true})
  };
  
  return (
    <header className="flex text-white bg-primary items-center w-full p-4">
      <NavLink to={"/"}>
        <img src={Logo} alt="Bahana" className="w-[130px]" />
      </NavLink>
      
      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg md:text-[11px]"><NavLink to={"/home"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Beranda</NavLink></li>
        <li className="mx-5 text-lg md:text-[11px]"><NavLink to={"/tentang"} className={({isActive}) => isActive ? isActiveStyles : isNotActiveStyles}>Tentang</NavLink></li>
      </ul>
      
      <div 
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      className="flex items-center ml-auto cursor-pointer gap-2 relative">
        <img src={user?.user.imageURL} alt="" referrerPolicy="no-referrer" className="w-12 h-12 md:w-13 md:h-13 min-w-[44px] object-cover rounded-full shadow-lg" />
        <div className="flex flex-col">
          <p className="text-white text-lg md:text-[20px] hover:text-headingColor font-semibold">{user?.user?.name}</p>
          <p className="flex items-center gap-2 text-xs text-color font-normal">Premium Member <FaCrown className="text-sm -ml-1 text-yellow-500" /></p>
        </div>
        
        {isMenu && (
          <motion.div 
          initial={{opacity : 0, y : 50}}
          animate = {{opacity : 1, y : 0}}
          exit = {{opacity : 0, y : 50}}
          className="absolute z-10 top-12 right-0 w-275 p-3 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col">
            {
              user?.user?.role === "admin" && (
                <>
                  <NavLink to={"/dashboard/home"}>
                    <p className="text-base text-white hover:font-semibold duration-150 transition-all ease-in-out"> Dashboard</p>
                  </NavLink>
            
                  <hr />
                </>
              )
            }
            
            <p className="text-base text-white hover:font-semibold duration-150 transition-all ease-in-out" onClick={logOut}> Keluar</p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
