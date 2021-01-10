import React, { useEffect, useState } from 'react'
import Product from './Product'
import getProducts from '../../API/getProduct/getProduct';
import io from 'socket.io-client'
import changeTime from '../../changeTime';
const ENDPOINT = "http://localhost:5000";
let socket;


function ListProducts() {
    const [Products, setProducts] = useState([]);
    const  handleSeller = (data)=>{
        socket.emit('clentSendData', data);
    }
    const [time,setTime] = useState('');
    useEffect(()=>{
        try{
            const  fetchData = async ()=>{
              await getProducts.getProducts().then(res=>{
                    const {data} = res;
                    setProducts([...data.products]);
                })
            }
            socket = io(ENDPOINT); 
                fetchData();

            socket.on('dataSenclient',()=>{
                fetchData();
            })

        }catch(err){
            console.log(err);
        }

        return () => socket.disconnect();
    },[])

    const setTimeEnd = (data)=>{
       
        const {timeEnd ,idProduct } = data;
       
        
        let newTime = timeEnd;
        const updateTime = setInterval(()=>{
            if(newTime === 0 ){
                clearInterval(updateTime);
            }
            setTimeString(newTime);
            socket.emit('clentSendData',{
                timeEnd : newTime ,
                idProduct : idProduct,
            });
            newTime--;
            if(timeEnd === 0) clearInterval(updateTime) ;
        },1000);
    }

    const setTimeString = (time)=>{
        const setTimeEnd = changeTime(time);
        const stringTime = setTimeEnd.h + ' h ' +  setTimeEnd.m + ' m ' + setTimeEnd.s + ' s' ;
        setTime(stringTime);
    }

    return  Products.map((product)=>{
        return <Product 
                    key = {product['_id']}
                    idProduct = {product['_id']}
                    name = {product['name_P']}
                    sprice = {product['prices_P']}
                    quatity = {product['quatity']}
                    onHandleSeller = {handleSeller}
                    isSale = {product['isSale']}
                    timeEnd = {product['timeEnd']}
                    setTimeEnd = {setTimeEnd}
                    timeSell = {time}
                />
    })

}

export default ListProducts;
