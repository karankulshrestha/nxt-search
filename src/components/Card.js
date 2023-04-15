import React from 'react'
import Image from 'next/image'


const Card = () => {
  return (
    <div className='w-2/3 relative h-63 bg-white ml-6 mt-4 rounded-md flex'>
    <Image src={"https://i.ytimg.com/vi/p-1du1jhkow/maxresdefault.jpg"} width={445} height={68} className="rounded-md"/>
    <div className='flex flex-col items-start mt-4 ml-4'>
        <div className='pb-4 text-3xl text-gray-600 font-bold overflow-hidden'>Adani Green</div>
        <div className='text-center text-xl text-gray-400 font-medium overflow-hidden'>Biggest Loan in the history of Indian Banks</div>
        <div className='pb-4 mt-6 text-xl font-bold'>Document</div>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View File</button>
    </div>
    </div>
  )
}

export default Card