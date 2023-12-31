import React, { useState, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';

import moment from 'moment';
import { changingUserRole, getAllUsers, removeUser } from '../api';
import { actionType } from '../context/reducer';

export const DashboardUserCard = ({ data, index }) => {
  const [{ user, allUsers }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const createdAt = moment(new Date(data.createdAt)).format("D MMMM YYYY");
  
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type : actionType.SET_ALL_USERS,
          allUsers : data.data,
        })
      })
    }
  }, [])
  
  const updateUserRole = (userId, role) => { 
    setIsUserRoleUpdated(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };
  
  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };
  
  return (
    <motion.div key={index} className="relative w-full rounded-md flex items-center justify-between py-4 bg-primary cursor-pointer hover:bg-card hover:shadow-md">
    
      {data._id !== user?.user._id && (
        
        <motion.div whileTap={{scale : 0.75}} className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200" onClick={() => deleteUser(data._id)}>
          <MdDelete className="text-xl text-red-400 hover:text-red-50" />
        </motion.div>
      )}
    
      {/* User image */}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img src={data.imageURL} referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md" alt="" />
      </div>
      
      {/* Username */}
      <p className="text-xs text-white w-275 min-w-[160px] text-center">{data.name}</p>
      <p className="text-xs text-white w-275 min-w-[160px] text-center">{data.email}</p>
      <p className="text-xs text-white w-275 min-w-[160px] text-center">{data.email_verified ? "Ya" : "Tidak"}</p>
      <p className="text-xs text-white w-275 min-w-[160px] text-center">{createdAt}</p>
      
      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-xs text-white text-center">{data.role}</p>
        {
          data._id !== user?.user._id && (
            <motion.p whileTap={{scale : 0.75}} className="text-[10px] font-semibold text-white px-1 bg-ungu rounded-sm hover:shadow-md" onClick={() => setIsUserRoleUpdated(true)}>
              {data.role === "admin" ? "Member" : "Admin"}
            </motion.p>
          )
        }
        
        {
          isUserRoleUpdated && (
            <motion.div initial={{opacity : 0, scale : 0.5}} animate={{opacity : 1, scale : 1}} exit={{opacity : 0, scale : 0.5}} className="absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md">
              <p className="text-primary text-[12px] font-semibold">Ubah status menjadi <span>{ data.role === "admin" ? "Member" : "Admin" }</span>?</p>
              <div className="flex items-center gap-4 ">
                <motion.button whileTap={{scale : 0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-white hover:shadow-md" onClick={() => setIsUserRoleUpdated(false)}>
                  Tidak
                </motion.button>
                <motion.button whileTap={{scale : 0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-white hover:shadow-md" onClick={() => updateUserRole(data._id, data.role === "admin" ? "member" : "admin")}>
                  Ya
                </motion.button>
              </div>
            </motion.div>
          )
        }
      </div>
    </motion.div>
  );
}

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/* Filters */}
      
      {/* Tabular data form */}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
      {/* Total count of users */}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold text-white">
            Jumlah : <span className="text-xl font-bold">{allUsers?.length}</span>
          </p>
        </div>
        
        {/* Table heading */}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Gambar</p>
          
          <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Username</p>
          
          <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Email</p>
          
          <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Terverifikasi</p>
          
          <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Dibuat Pada</p>
          
          <p className="text-sm text-white font-semibold w-275 min-w-[160px] text-center">Status</p>
        </div>
        
        {/* Table body content */}
        {
          allUsers && (
            allUsers?.map((data, i) => (
              <DashboardUserCard data={data} index={i} />
            ))
          )
        }
      </div>
    </div>
  );
};

export default DashboardUsers;
