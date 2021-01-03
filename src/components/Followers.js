import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


import './Followers.css';

const Followers = () => {

    const [followers, setFollowers] = useState();
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://api.github.com/users/${ username }/followers`
            );
            setFollowers(result.data);
        };

        fetchData();
    }, [username]);

    return ( 
        <div className='follower-container'>
            <h2>Followers of { username }</h2>
            {!followers ?
            (<h1>Loading...</h1>)
            : (followers.map((follower, id) => {
                return (
                    <Link to={ "/user/"+follower.login }  >
                    <div className='follower-name-container'>
                        <img src={ follower.avatar_url } alt={`${ username } avatar`} className="user-follower-avatar"></img> 
                        <div className='follower-login'>
                            <span>{ follower.login }</span>
                        </div>
                    </div>
                    </Link>
                )
            }))}
        </div>
    );
}


export default Followers;