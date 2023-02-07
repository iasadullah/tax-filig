import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiNames from '../Constants/ApiNames';
import FullScreenLoading from '../Components/FullScreenLoading';
import UserContext from '../utils/UserContext';
import {fetchPost, fetchGet} from '../utils/FetchApi';
const Walkthrough = () => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    // console.warn('this is walkthorough');
    initializeToken();
  }, []);
  const initializeToken = async () => {
    try {
      global.authToken = null;
      let token = await AsyncStorage.getItem('AuthToken');
      if (token === null) {
        generateToken();
      } else {
        global.authToken = token;
        authenticateToken();
      }
    } catch (error) {
      console.log('initialize token error::', error);
    }
  };

  const generateToken = async () => {
    try {
      let data = {
        username: Config.username,
        password: Config.password,
      };
      let response = await fetch(`${Config.baseUrl}${ApiNames.generateToken}`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let jsonResponse = await response.json();
      if (jsonResponse.jwttoken) {
        await AsyncStorage.setItem('AuthToken', jsonResponse.jwttoken);
        global.authToken = jsonResponse.jwttoken;
        authenticateToken();
      }
      console.warn('jwt token::', jsonResponse);
    } catch (error) {
      console.log('generate token error ::', error);
    }
  };
  const authenticateToken = async () => {
    try {
      let response = await fetchGet(ApiNames.authenticateToken);
      if (response.valid === true) {
        userContext.updateIsWalkthrough(false);
      } else {
        generateToken();
      }
    } catch (error) {
      console.log('authenticate error::', error);
      userContext.updateIsWalkthrough(false);
    }
  };
  return <FullScreenLoading />;
};

export default Walkthrough;
