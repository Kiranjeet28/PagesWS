'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Imagepage } from '@/type/Image';

function Images({ src, classes, TextClasses, text, time ,loading}: Imagepage) {
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        if(loading){
        const interval = setInterval(() => {
            setIsHovered(true);
            const timeout = setTimeout(() => {
                setIsHovered(false);
            }, 1000)

            return () => clearTimeout(timeout);
        }, time);

        return () => clearInterval(interval);
    }
    }, [time,loading]);
    return (
        <div className='invisible md:visible'>
            {isHovered && (
                <div className={`absolute  bg-white text-black rounded-md flex justify-center items-center p-2 ${TextClasses}`}>
                    <span className="text-center  overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
                </div>

)}

            <Image

                src={src}
                width={300}
                height={100}
              
                alt="Voltsec WebImages"
                className={`  absolute sm lg:h-65 lg:w-65 shadow-black/40 drop-shadow-2xl md:h-65 md:w-65  md:m-0 m-0 p-0 ${isHovered && loading &&  `animate-bounce`}  ${classes}`}
            />

    
        </div>
    );
};

export default Images;