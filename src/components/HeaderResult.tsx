import React, { useState } from 'react';
import { SecurityHR } from '@/type/result';
import { Highlight } from './UI/Componets/hero-highlight';

function SecurityHeaderResult({ name, level, desc, recommand, present }: SecurityHR) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <div 
        className='bg-white  text-black p-3 md:px-7 md:p-5 rounded-lg mx-[6vw] cursor-pointer hover:bg-gray-200 transition duration-300'
        onClick={handleOverlay}
      >
        <ul className='flex flex-row justify-between items-center font-bold'>
          <li className='w-[45vw] text-left ml-9'>{name}</li>
          <li className='w-[45vw] text-center'>{level}</li>
          <li className='w-[45vw] text-right mr-9'>
            <span className='bg-blue-900 min-w-fit p-3 rounded-full text-gray-100'>
              {present}
            </span>
          </li>
        </ul>
      </div>

      {showOverlay && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2'>
          <div className='bg-blue-900 p-6 rounded-lg shadow-lg text-left relative'>
            <button 
              className='absolute top-2 text-[30px] right-2 font-bold bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center'
              onClick={handleOverlay}
            >
              &times;
            </button>
            <Highlight className="text-black text-2xl font-bold mb-4 dark:text-white">
            {name}
            </Highlight>
            <p className='mb-4 mt-4'><strong>Level:</strong> {level}</p>
            <p className='mb-4'><strong>Description:</strong> {desc}</p>
            <p className='mb-4'><strong>Recommendation:</strong> {recommand}</p>
            <p className='mb-4'><strong>Present Status:</strong> 
            <span className='bg-white text-blue-500 rounded-full font-bold p-2 ml-1'>{present}</span></p>
          </div>
        </div>
      )}
    </>
  );
}

export default SecurityHeaderResult;
