import Image from 'next/image';
import React from 'react';
function Loading() {
  return (
    <div className='bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700 h-[90vh] flex items-center justify-center '>
      <div className='m-auto'>
        <Image
          src='https://i.pinimg.com/originals/eb/17/d0/eb17d0925c49ef13af6e84cdfeaad079.gif'
          width={170}
          height={170}
          alt="Voltsec web Loader "
          className=" rounded-full"
        />
      </div>
    </div>
  );
};

export default Loading;