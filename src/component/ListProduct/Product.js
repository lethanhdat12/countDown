import {useEffect, useRef} from 'react'

function Product(props){
    const  btnRef = useRef();
    const {name ,sprice , quatity=0 , idProduct , onHandleSeller , isSale , timeEnd , setTimeEnd ,timeSell} = props;
    let newQuantity = quatity - 1;

    useEffect(()=>{
        if(!isSale){
            btnRef.current.disabled  = true ;
        }
    });

    useEffect(()=>{
        if(setTimeEnd){
            setTimeEnd({
                timeEnd : timeEnd,
                idProduct : idProduct,
            });
        }
    },[])

    const onSeller =  (id)=>{
        if(!onHandleSeller) return;
        const data = {
            idProduct : id,
            newQuantity : newQuantity,
            isSale : (newQuantity > 0 && timeEnd > 0) ? true : false,
        }
        onHandleSeller(data);
    }
        return (
            <div className="col-md-3">
                <div className="card">
                    <div className="card-header"> {name} </div>
                    <div className="card-body">
                        <img src="/img/anh1.jfif" alt=""/>
                    </div>
                    <div className="card-footer">
                        <div id="sprice">{sprice} đ</div>
                        <div id="quantity">
                            <div id="quantityItem" style={{width : `100%`}}></div>
                        </div>
                        <div> {(isSale)? `Còn ${quatity} sản phẩm` : 'Sản phẩm hết hàng'}</div>
                        <div> Kết thúc sau : {timeSell} </div>
                        <button className={(isSale) ? 'btnSeller' : 'btnSeller disableCus'} onClick = {()=>onSeller(idProduct)} ref = {btnRef} > {(isSale) ? 'Mua ngay' : 'Hết hàng'} </button>
                    </div>
                </div>
            </div>
        )
}

export default Product;
