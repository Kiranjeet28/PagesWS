import React from 'react';
import Image from 'next/image';
import Button from './button';
import { useRouter } from 'next/navigation';

function ErrorPage({ error }: { error: any }) {
  const route = useRouter()
  const handleRoute = async () => {
    try {
      await route.push('/webscanner')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700 h-[90vh] flex items-center justify-center flex-col '>
      <div className='m-auto p-10 bg-white rounded-lg flex flex-col justify-center items-center '>
        <div className='flex flex-row justify-center items-center'>
          <p className='font-bold text-red-500 '>
            Opps! {error}
          </p>
          <Image
            src='https://media.tenor.com/97Zio3BdYvQAAAAj/fluent-emoji.gif'
            alt='Error Image'
            height={50}
            width={50}
            className='ml-2 rounded-full' />
        </div>

        <Button
          text={'Scan other Website'}
          onClick={() => { handleRoute() }}
          disabled={''}
          className="ml-4 text-2xl"
        />
      </div>

    </div>
  );
};

export default ErrorPage;