import axios from "axios";

const apiClient = async (url, method, data, params = {}) => {
    try {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
        const token = localStorage.getItem("token");
        const headers = token ? {
          Authorization: token,
        } : {};
        const response = await  axios({ method, data, url, params, headers});
        return Promise.resolve(response.data)
    } catch (error) {
        return Promise.reject(error.message)
    }

};

export default apiClient;
