/* eslint-disable */
import axios from 'axios';
import localStorage from 'local-storage';

const callApi = async (data, method, url) => {
  console.log('Data inside callapi ', data);
  try {
    console.log('inside try of api')
    const baseUrl = 'http://localhost:9000/api' + url;
    const response = await axios({
      method,
      url: baseUrl,
      data,
      headers: {
       authorization: localStorage.get('token'),
      },
    });
    return response.data;
  } catch (error) {
    console.log('Inside catch of api', error , error.response);
    return { status: 'error', message: 'This is a error message' };
  }
};
export default callApi;
