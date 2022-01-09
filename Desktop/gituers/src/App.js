import React, { useState } from 'react';
import './App.css';
import { IconDot, IconGroup, IconOrg, IconsLocation, IconTwitter } from './icons';


function App () {
  const [profile, setProfile] = useState()
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())
    .then(data => {
      if(data.message){
        setError(data.message)
      }
      else{
        console.log(data);
        setProfile(data);
        setError(null);
      }     
    })
  }

  return (
    <div>
      <div className="navbar">
        <h2>GitHub Search</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="GitHub username" onChange={handleSearch} />
          <button>Search</button>
        </form>
      </div>  
      {profile &&
        <div className='profile'>
          {error ? (<h1>{error}</h1>) : (
            <>
              <img src={profile.avatar_url} className='avatar' />
              <h1>{profile.userName}</h1>  
              <h3>{profile.userName}</h3>
              <p>{profile.bio}</p>
              <p><a href={profile.html_url} target="_blank" rel='noppener noreferral' className='edit'>Edit profile</a></p>
              <p className='socials'>
                <IconGroup /> {profile.followers}<a href={profile.followers_url} rel='noppener noreferral'>followers</a> <IconDot /> {profile.following} <a href={profile.following_url} rel='noppener noreferral'>following</a>
              </p>  
              <p><IconOrg /> {profile.company}</p>
              <p><IconsLocation /> {profile.location}</p>
              <p><IconTwitter /> {profile.twitter_username}</p>
            </>
            )}
        </div> 
    }
    </div>
  );
}

export default App;
