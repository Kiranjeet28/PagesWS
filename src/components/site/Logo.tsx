import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' className='flex items-center justify-start lg:flex-1'>
      <Image className=' h-8 w-auto' src='https://www.voltsec-io.com/_next/image?url=%2Flogo.jpeg&w=32&q=75' height='30' width='30' alt='Voltsec' />
      <span className='ml-1 text-2xl font-medium text-white'>Voltsec.io</span>
    </Link>
  )
}

export default Logo
