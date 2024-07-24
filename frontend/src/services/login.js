import axios from "axios";
const baseUrl = "http://bloghubbackend.fly.dev/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log('logging in with: ', response);
  return response.data;
};

export default { login };
