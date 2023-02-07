import React, {useEffect, useState, useContext} from 'react';
import UserContext from './src/utils/UserContext';
import HomeScreen from './src/Screens/HomeScreen';
import Walkthrough from './src/Screens/Walkthrough';
export default PDFExample = () => {
  const [isWalkthrough, setIsWalkthrough] = useState(true);
  const updateIsWalkthrough = _isWalkthrough => {
    setIsWalkthrough(_isWalkthrough);
  };
  return (
    <UserContext.Provider value={{isWalkthrough, updateIsWalkthrough}}>
      {isWalkthrough ? <Walkthrough /> : <HomeScreen />}
    </UserContext.Provider>
  );
};
