import React, { useEffect, useState } from 'react';
import "../assets/css/components/Success.css"
import Congrats from '../assets/Congrats.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';


const Success = () => {
  
  return (
    <div className="congrats">
        <p className='congratsText'>Congratulations!</p>
        <p>You've Reached Your Goal</p>
        
        <Lottie animationData={Congrats} className='congratsGIF'/>

        <Link className='newGoal' to={"/goalselection"}>Start New Goal</Link>
    </div>
  );
}


export default Success