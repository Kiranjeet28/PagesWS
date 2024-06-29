"use client"

import React, { useState } from 'react';
import Button from '@/components/button';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';
const Login = () => {
  const route = useRouter()
  const [email, setEmail] = useState('');
  const [laoding, setlaoding] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      setlaoding(true)
      const response = await fetch('/api/GetAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        route.push('/Allusers')
        console.log('Login successful!');
        // Implement your logic here (e.g., redirect to protected route)
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage("An error occurred. Please try again.");
    }finally{
      setlaoding(false)
    }
  };

  return (
    <div className='w-[100vw] bg-gradient-to-tr from-blue-500 via-blue-300 to-blue-700'>
        <form onSubmit={handleSubmit} className=" ml-5 mr-5 flex flex-col text-black">
      <label htmlFor="email" className="text-white font-medium mt-20">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className=" rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 "
      />
      <label htmlFor="password" className="font-medium text-white">
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
     <Button
      text="Login"
      onClick={()=>{}}
      disabled={laoding}
      className={'mb-20'}/>
      {errorMessage && (
        <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
      )}
    </form>
    {laoding && <Loading/>}
    </div>
  
  );
};

export default Login;
