import axiosProducts from '../productApi'

const getProducts = {
    getProducts : ()=>{
     return axiosProducts.get('/');
    }
};

export default getProducts;