import axios from "axios";
export const url = "http://localhost:3001"; // CAMBIAR EN GITHUB por https://challengehenry-production.up.railway.app
export const GET_USERS = "GET_USERS";
export const DELETE_USER = "DELETE_USER";
axios.defaults.baseURL = url;

export const createUser = (newUser) => {
  const endpoint = "/user";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, newUser);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const searchUserByEmail = (email) => {
  const endpoint = `/user/${email}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const getUsers = () => {
  const endpoint = "/users";
  return async (dispatch) => {
    await axios.get(endpoint).then(({ data }) => {
      return dispatch({
        type: GET_USERS,
        payload: data,
      });
    });
  };
};

export const deleteUser = (email) => {
  const endpoint = `/user/${email}`;
  return async (dispatch) => {
    try {
      await axios.delete(endpoint);
      return dispatch({
        type: DELETE_USER,
        payload: email,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateUser = (updatedData,email) => {
  const endpoint = `/user/${email}`;
  return async (dispatch) => {
    try {
      const response = await axios.put(endpoint, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};
