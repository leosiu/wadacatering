// api.js or a similar file
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4242';

const api = axios.create({
    baseURL: baseURL,
});

export default api;
