import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Repos.css';

const Repos = () => {

    const [repos, setRepos] = useState();
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://api.github.com/users/${ username }/repos`
            );
            setRepos(result.data);
        };

        fetchData();
    }, [username]);

    

    return ( 
        <div className='repo-container'>
            <h2>{ username }'s repos </h2>
            { !repos ?
            (<h1>Loading...</h1>)
            : (repos.map((repo, id) => {
                return (
                    <div className='repo-name-container'>
                        <span>{ repo.full_name }</span> 
                        <div className='repo-star-count'>
                            <span>{ repo.stargazers_count }</span>
                            <span className='star'>★</span>
                        </div>
                    </div>
                )
            }))}
            
        </div>
    );
}

export default Repos;