import {} from "./actions";

const initialState = {
  users: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.email !== action.payload),
      };
    default:
      return state;
  }
};


export default rootReducer;
