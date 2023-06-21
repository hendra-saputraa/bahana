import React from 'react';
import { BsEmojiLaughing } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Alert = ({ type }) => {
  return (
    <motion.div 
      initial={{ translateX : 200, opacity : 0 }}
      animate={{ translateX : 0, opacity : 1 }}
      exit={{ translateX : 200, opacity : 0 }}
      key={type}
      className={`fixed top-12 right-12 px-4 py-3 rounded-md backdrop-blur-md flex items-center justify-center shadow-xl
      ${type === "success" && "bg-green-600"}
      ${type === "failed" && "bg-red-600"}
    `}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiLaughing className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">
            Berhasil
          </p>
        </div>
      )}
      
      {type === "failed" && (
        <div className="flex items-center justify-center gap-4">
          <BsEmojiLaughing className="text-3xl text-white" />
          <p className="text-xl font-semibold text-white">
            Gagal, mohon coba kembali...
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
