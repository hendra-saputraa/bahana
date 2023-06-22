import React from 'react';
import { GrEmoji } from 'react-icons/gr';
import { Logo } from './assets/img';

const Announcement = () => {
  return (
    <div className="relative h-full w-full flex">
      <div className="absolute top-40 flex flex-col gap-2 p-4 items-center justify-center -mt-5">
        <img src={Logo} alt="Bahana" className="w-25 -mb-8" />
        <p className="font-bold text-xl text-white">
          HALO PENGUNJUNG!
        </p>
        <p className="font-semibold text-sm text-white text-center">
          Saat ini Bahana hanya dapat diakses oleh pengguna dengan resolusi layar minimal 480px! Jika kamu pengguna mobile, mohon aktifkan tampilan situs desktop terlebih dahulu ya!
        </p>
        <p className="flex gap-1 font-light text-xs text-white">
          Terima kasih atas pengertiannya! <GrEmoji />
        </p>
      </div>
    </div>
  );
};

export default Announcement;
