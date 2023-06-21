import React from 'react';
import Header from './Header';

const About = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      
      <p className="text-2xl text-white font-bold">
        Tentang Bahana
      </p>
      <p className="text-xl text-white font-semibold">
        enim anim aliqua esse adipisicing veniam laborum reprehenderit non sit incididunt aliqua eiusmod culpa culpa culpa exercitation nostrud cillum dolor cupidatat labore ullamco consequat labore reprehenderit officia proident ipsum cillum
      </p>
    </div>
  );
};

export default About;
