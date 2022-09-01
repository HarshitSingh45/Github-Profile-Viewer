import React, {useState, useCallback, useRef} from 'react'
import { useEffect } from 'react'
import {BsGithub, BsSearch} from 'react-icons/bs'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import useUserSearch from './useUserSearch'

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const {users} = useUserSearch(query, pageNumber);

    const debounce = (func) => {
        let timer;
        return function (...args){
            const context = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(()=>{
                timer = null;
                func.apply(context, args);
            },1500 )
        }
    }
    function handleSearch(e){
        setQuery(e.target.value);
        setPageNumber(1);
    }
    const optimisedVersion = useCallback(debounce(handleSearch),[]);

    const loader = useRef(null);
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPageNumber((prev) => prev + 1);
        }
      }, []);
      useEffect(() => {
        const option = {
          root: null,
          rootMargin: "20px",
          threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
      }, [handleObserver]);
    
  return (
    <div>
        <div className='m-16 flex items-center justify-center md:justify-start flex-row'>
            <BsGithub className='text-7xl md:text-5xl'/>
            <p className='text-gray-500 text-3xl md:text-5xl font-semibold pl-6'>
                GitHub Profile Viewer
            </p>
        </div>
        <div className=' w-[90%] md:w-[50%] ml-5 md:ml-16  flex flex-row bg-searchColor font-bold'>
            <BsSearch className='ml-5 mt-3 text-white text-3xl'/>
            <input type="text" 
                   className='w-full m-1 p-3 bg-searchColor text-white 
                              text-2xl overflow-hidden placeholder:text-white' 
                   placeholder='Search User' 
                   id='ip'
                   onChange={optimisedVersion}
                   
            />
            <ImCross 
                 className='text-white text-3xl mt-3 mr-5 cursor-pointer'
                 onClick={() => {
                    var el = document.getElementById("ip");
                    el.value = "";
                    setQuery('')
                 }} />
        </div>
        <div 
            
            className=' bg-white m-6 md:m-16 min-h-[500px] p-6 flex items-center justify-evenly gap-6 flex-wrap'>
            { users.length === 0 ? <><div className='text-2xl font-semibold text-gray-400'>
                To view users type user name in search box</div></> : <></>}
            {
                users?.map((elem, index) => {
                    if(elem == '') return
                    let url = `/user/${elem}`
                    return <Link to={url} key={index}><UserCard  handle={elem}/> </Link>                   
                })
            }
        </div>
        <div ref={loader} />
    </div>
    
  )
}
