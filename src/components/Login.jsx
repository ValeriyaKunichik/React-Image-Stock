import React from 'react';

import {GoogleLogin} from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import sharePhoto from '../assets/pexels1.jpg';
import jwt_decode from 'jwt-decode'
import { client } from '../client';

const Login = () => {
  
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const decoded=jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, sub, picture } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <img
          src={sharePhoto}
          type="video/mp4"
          className="w-full h-full object-cover"
          alt="bg camera"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <h1 className="flex px-5 gap-2  w-210 font-medium  text-4xl mt-3 mb-2  text-white items-center">MY STOCK</h1>
          </div>

          <div className="shadow-2xl">
          <GoogleLogin 
        onSuccess={responseGoogle}
        onError={responseGoogle}/>
          </div>
        </div>
      </div>
    </div>
      

  )
};

export default Login;
