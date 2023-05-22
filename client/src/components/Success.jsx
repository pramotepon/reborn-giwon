import React, { useEffect, useState } from 'react';
import "../assets/css/components/Success.css"
import Congrats from '../assets/Congrats.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Success = () => {

  const [goal, setGoal] = useState(null);
  const navigate = useNavigate();

  // UseContext ลองง
  // Use the user value from the UserContext

  const { user } = useContext(UserContext);
  const userId = user._id;

  // Create function when Onclick
  // To stop looping to SuccessPage when click the button

  const handleNewGoalClick = async () => {
    try {

      // Call API call to update the user's goal weight to null

      await axios.put(`/users/goal-weight-update/${userId}`, { goal: null });

      // Update the local state

      setGoal(null);

      // Navigate to the goalselection page
      
      navigate('/goalselection');

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="congrats">
        <p className='congratsText'>Congratulations!</p>
        <p>You've Reached Your Goal</p>
        
        <Lottie animationData={Congrats} className='congratsGIF'/>

        <button className='newGoal' onClick={handleNewGoalClick}>Start New Goal</button>
    </div>
  );
}


export default Success