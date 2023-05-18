import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import verifyToken from '../utils/verifyToken';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    if (!user && localStorage.getItem('user')) {
      const { token } = JSON.parse(localStorage.getItem('user'));
      try {
        const data = await verifyToken(token)
        // const { data } = await axios.get(`/users/profile/${token}`);
        setUser(data);
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
        setReady(true);
      }
    } else {
      setLoading(false);
      setReady(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    // Render a loading indicator until the data is fetched
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;