import { APPLY_FILTERS, GET_USERS, DELETE_USER } from "./actions";

const initialState = {
  users: [],
  filteredUsers: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.email !== action.payload),
        filteredUsers: state.users.filter(
          (user) => user.email !== action.payload
        ),
      };
    case APPLY_FILTERS:
      const { language, howFound, newsletter, email } = action.payload;
      let filtered = state.users;
      filtered = filtered.filter((user) => {
        const matchesLanguage =
          language === "All" || user.language === language;
        const matchesHowFound = howFound === "All" || user.findUs === howFound;
        const matchesNewsletter =
          newsletter === "All" ||
          (newsletter === "Si" && user.newsletter) ||
          !user.newsletter;
        const matchesEmail =
          email === "" ||
          user.email.toLowerCase().trim().includes(email.toLowerCase().trim());

        return (
          matchesLanguage &&
          matchesHowFound &&
          matchesNewsletter &&
          matchesEmail
        );
      });

      return {
        ...state,
        filteredUsers: filtered,
      };
    default:
      return state;
  }
};

export default rootReducer;
