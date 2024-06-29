import React from 'react';

function Button({onClick, disabled,text,className}:{onClick:any,disabled:any,text:any,className:String}){
  return (
    <button onClick={onClick} disabled={disabled} className={`mt-7  inline-flex items-center justify-center  rounded-lg   bg-blue-600 px-5 py-3 text-center text-base  font-medium text-white shadow-2xl  shadow-black/40 focus:ring-4 focus:ring-primary-300 dark:hover:bg-blue-700 dark:focus:ring-primary-900 font-bold'} ${className}`}>
    {text}
</button>
  );
};

export default Button;