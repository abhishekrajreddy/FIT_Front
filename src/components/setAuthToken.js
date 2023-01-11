import axios from "axios";

export const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["authenticated"] = token;
  } else {
    delete axios.defaults.headers.common["authenticated"];
  }
};

export default SetAuthToken;
