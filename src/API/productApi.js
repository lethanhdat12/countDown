import axios from 'axios'

const axiosProducts = axios.create({
  method: 'get', 
  baseURL: 'http://localhost:5000/',
})

export default axiosProducts;