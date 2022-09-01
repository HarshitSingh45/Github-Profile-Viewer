import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default function useUserSearch(query='', pageNumber) {
    const [users, setUsers] = useState([[]]);

    useEffect(() => {
        setUsers([])
    },[query])
    useEffect(()=>{
        if(query === '') return
        try{
            const fetchData = async() => {
                const response = await axios({
                    method: 'GET',
                    url: 'https://api.github.com/search/users',
                    params: { q: query, page: pageNumber, per_page: 30},
                })
                const userData = response.data.items.map(user => user.login); 
                setUsers(prevUsers => [...prevUsers, ...userData])
            }
            fetchData();
        }catch(err) {
            console.log('ERROR ',err);
            return
        }
        
    },[query, pageNumber])
  
  return {users}
}

 

