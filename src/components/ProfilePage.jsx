import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom';
import RepoCard from './RepoCard'
import {IoMdArrowRoundBack} from 'react-icons/io'
import axios from 'axios';

export default function ProfilePage() {
    const params = useParams();
    const userID = params.userid;
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('')
    const [company, setCompany] = useState('')
    const [followers, setFollowers] = useState(0);
    const [repos, setRepos] = useState([])
    const [repoCount, setRepoCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const fetchData = async() => {
                const response = await axios.get(`https://api.github.com/users/${userID}`)
                const repoResponse = await axios.get(`https://api.github.com/users/${userID}/repos`)
                setAvatar(response.data.avatar_url);
                setBio(response.data.bio);
                setName(response.data.name);
                setCompany(response.data.company);
                setRepos(repoResponse.data);
                setFollowers(response.data.followers);
                setRepoCount(response.data.public_repos);
            }
            fetchData();
        }catch(err){
            console.log('ERROR IN USERCARD ',err)
            return;
        }
    },[userID])
  
                              
  return (
    <div>
        <div 
           onClick={() => navigate(-1)}
           className='m-10 md:m-16 flex items-center justify-start text-3xl cursor-pointer'>
            <IoMdArrowRoundBack /> &nbsp;
            back
        </div>
        <div className=' m-10 md:m-16 flex items-center justify-start'>
            <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] mr-7'>   
                    <img
                    src={avatar}
                    alt=""
                    className="w-full h-full object-contain"
                    />
            </div>
            <div>
                <h1 className='font-bold text-2xl md:text-4xl'>{name}</h1>
                <h2 className='font-semibold text-xl md:text-2xl text-gray-400'>@{userID}</h2>
            </div>
            
        </div>
        <div className=' m-5 md:m-10 p-4
         bg-white flex flex-col'>
                <div className='ml-6 mt-6'>
                    <p className='text-gray-500 text-2xl'>Bio</p>
                    <p className='text-xl'>
                        {bio ? bio 
                        :
                       ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi sequi quibusdam iusto, facilis tempora cupiditate culpa libero amet minima. Cumque cum exercitationem eos quo possimus quas sapiente sequi? Nobis, laudantium.'
                        }
                    </p>
                </div>
                <div className='ml-6 mt-8'>
                    <p className='text-gray-500 text-2xl'>Works At</p>
                    <p className='text-xl'>
                        {company ? company : 'NOT-WORKING'}
                        {/* Lorem ipsum, dolor sit amet  */}
                    </p>
                </div>
                <div className='ml-6 mt-8 flex flex-row items-center justify-start gap-3'>
                    <div className='w-[50%]'>
                        <p className='text-gray-500 text-2xl'>Repositories</p>
                        <p className='text-xl'>{repoCount}</p>
                    </div>
                    <div>
                        <p className='text-gray-500 text-2xl'>Followers</p>
                        <p className='text-xl'>{followers}</p>
                    </div>
                </div>
                <div className='ml-6 mt-8'>
                    <p className='text-gray-500 text-2xl mb-6'>Pinned Repositories</p>
                    <div className='flex flex-col gap-6 items-center justify-center'>
                    {
                        repos.slice(0,6).map((repo, index) => {
                            return (
                                <RepoCard key={index} name={repo.name} description={repo.description}/>
                            )
                        })
                    }
                    </div>
                </div>
        </div>
    </div>
  )
}
