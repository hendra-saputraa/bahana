import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <div className="w-full h-auto bg-primary">
      <Header />

      <div className="flex flex-col gap-3 p-4 items-center justify-center">
        <p className="text-xl text-white font-bold">
          Tentang Bahana
        </p>
        <div className="gap-3">
          <p className="text-md text-color font-normal">
            Versi: 1.0.0 <br /> Teknologi: MERN (Mongo-Express-React-Node)
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            Selamat datang di Bahana - Ekspresikan dirimu melalui sebuah lagu!
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            Bahana adalah sebuah platform musik yang memungkinkan Anda untuk mengekspresikan diri melalui lagu. Kami percaya bahwa musik memiliki kekuatan untuk menyampaikan perasaan dan emosi yang mendalam. Dengan Bahana, Anda dapat menemukan lagu-lagu yang menginspirasi, membuat daftar putar pribadi, dan berbagi karya musik Anda dengan dunia.
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            Fitur-Fitur Utama:
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            1. Dashboard Admin: Kami memberikan kemudahan kepada admin untuk mengelola konten musik di platform ini. Anda dapat dengan mudah menambahkan, mengedit, dan menghapus lagu, album, serta informasi lainnya. Kami ingin memberikan Anda kontrol penuh atas pengalaman musik yang Anda berikan kepada pengguna.
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            2. Autentikasi dengan Google: Bahana didukung oleh Firebase, memungkinkan Anda untuk masuk ke akun Anda menggunakan login Google. Kami memprioritaskan keamanan dan kenyamanan pengguna dengan menyediakan autentikasi yang terjamin.
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            3. MongoDB sebagai Real-time Database: Kami menggunakan MongoDB sebagai database real-time untuk menyimpan informasi penting seperti teks lagu, detail album, dan informasi artis. Dengan ini, Anda dapat memperoleh pengalaman yang mulus dan cepat saat menjelajahi lagu-lagu favorit Anda.
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            4. Firebase Storage untuk Penyimpanan Real-time: Kami menyadari bahwa foto dan audio dalam format besar membutuhkan ruang penyimpanan yang memadai. Oleh karena itu, kami memanfaatkan Firebase Storage sebagai solusi penyimpanan real-time untuk menyimpan foto dan audio dengan ukuran yang cukup besar, memastikan aksesibilitas dan pengalaman yang optimal.
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            5. Pemutaran Musik Universal: Dengarkan musik favorit Anda di Bahana di mana pun dan kapan pun. Kami memberikan fleksibilitas kepada pengguna untuk memutar lagu sebagai background, memungkinkan Anda menikmati musik favorit sambil melakukan kegiatan lainnya.
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            Bergabunglah dengan kami di Bahana dan temukan jalinan emosi dalam setiap not musik. Mari bersama-sama mengekspresikan diri melalui sebuah lagu!
          </p>
          <p className="text-primary text-xl">break</p>
          <p className="text-md text-color font-normal">
            Terima kasih telah mengunjungi Bahana 1.0.0 - Platform musik yang menggetarkan jiwa Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
