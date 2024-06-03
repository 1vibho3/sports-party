import axios from 'axios';

const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE_URL}/login`, { username, password });
      return response.data.token;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },

  register: async (username, password, email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AUTH_SERVICE_URL}/register`, { username, password, email });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
};

export default authService;
