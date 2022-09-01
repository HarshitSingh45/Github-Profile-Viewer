import React from 'react';
import {motion} from 'framer-motion'

export default function RepoCard({name, description}) {
  return (
    <motion.div 
    className='border-2 border-gray-200 p-5 w-[110%] md:w-full flex flex-row 
    items-center justify-start bg-cardOverlay
    backdrop-blur-lg hover:drop-shadow-lg shadow-xl cursor-pointer'
    whileHover={{ scale: 1.05 }}
    >
        <div className=' w-[50px] h-[50px] mr-5 md:mr-10'>   
                <img
                  src='https://www.w3schools.com/howto/img_avatar.png'
                  alt=""
                  className="w-full h-full object-contain rounded-full"
                />
        </div>
        <div>
            <p className='text-lg font-bold'>{name ? name : 'Username/reponame'}</p>
            <p className='font-semibold text-gray-500'>{description ? description : 'Description about repository'}</p>
        </div>
    </motion.div>
  )
}
