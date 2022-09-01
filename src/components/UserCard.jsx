import React from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function UserCard({handle}) {
    // console.log('NAME ', name)
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('')

    useEffect(()=>{
        try{
            const fetchData = async() => {
                const response = await axios.get(`https://api.github.com/users/${handle}`)
                setAvatar(response.data.avatar_url);
                setBio(response.data.bio);
                setName(response.data.name)
            }
            fetchData();
        }catch(err){
            console.log('ERROR IN USERCARD ',err)
            return;
        }
    },[name])

  return (
    <motion.div className='w-375 min-h-[150px] p-4 border-2 border-gray-200 
         flex flex-row items-center justify-between bg-cardOverlay
         backdrop-blur-lg hover:drop-shadow-lg shadow-xl cursor-pointer'
         whileHover={{ scale: 1.1 }}
    >
        <div className=' w-[75px] h-[75px]'>   
                <img
                //   src='https://www.w3schools.com/howto/img_avatar.png'
                  src={avatar}
                  alt=""
                  className="w-full h-full object-contain rounded-full"
                />
        </div>
        <div className='w-[250px] flex flex-col overflow-hidden gap-1'>
            <h2 className='font-bold text-lg'>{name}</h2>
            <div className='text-gray-400 font-semibold'>
                {bio}
                {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex doloribus assumenda  */}
            </div>
        </div>
    </motion.div>
  )
}
