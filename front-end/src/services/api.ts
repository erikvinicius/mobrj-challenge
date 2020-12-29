import axios from 'axios';
import ApiConfig from '../config/api';

const api = axios.create({
  baseURL: ApiConfig.backendUrl || 'http://localhost:3333'
});

export default api;