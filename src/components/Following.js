import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import './Following.css';

const Following = () => {

    const [following, setFollowing] = useState();
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://api.github.com/users/${ username }/following`
            );
            setFollowing(result.data);
        };

        fetchData();
    }, [username]);

    return ( 
        <div className='following-conatiner'>
            <h2>Followed by { username }</h2>
            {!following ?
            (<h1>Loading...</h1>)
            : (following.map((following, id) => {
                return (
                    <Link to={ "/user/"+following.login } >
                    <div className='following-name-container'>
                        <img src={ following.avatar_url } alt={`${ username } avatar` } className="user-following-avatar"/> 
                        <div className='following-login'>
                            <span>{ following.login }</span>
                        </div>
                    </div>
                    </Link>
                )
            }))}
        </div>
    );
}

export default Following;