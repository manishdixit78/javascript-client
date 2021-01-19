/* eslint-disable */
import axios from 'axios';

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
       authorization: localStorage.getItem('token'),
      },
    });
    console.log('res in api :', response);
    return response.data;
  } catch (error) {
    console.log('Inside catch of api', error , error.response);
    return { status: 'error', message: 'This is a error message' };
  }
};
export default callApi;
