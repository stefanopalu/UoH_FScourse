import axios from "axios";
const baseUrl = "/api/users";

const getAll = () => {
    console.log("Fetching users...")
    const request = axios.get(baseUrl);
    return request.then((response) => {
      console.log("Fetched users:", response.data);
      return response.data
    });
  };

export default { getAll };
