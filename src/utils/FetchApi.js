import Config from 'react-native-config';
export const fetchGet = async endPoint => {
  try {
    let response = await fetch(`${Config.baseUrl}${endPoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${global.authToken}`,
      },
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.log('fetch get error::', error);
  }
};

export const fetchPost = async (apiName, data) => {
  console.warn('params::', apiName, data);
  try {
    let response = await fetch(`${Config.baseUrl}${apiName}`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${global.authToken}`,
      },
      body: JSON.stringify(data),
    });
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.warn('fetchPostError::', error);
  }
};
