import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


import { MyContext } from '../../App';


const Product = ({item}) => {

    const [productData, setProductData] = useState();
    const [isAdded, setIsadded] = useState(false);
    
    const context  = useContext(MyContext);

    useEffect(() => {
        setProductData(item);
    }, [item])

    const setProductCat=()=>{
        sessionStorage.setItem('parentCat', productData.parentCatName);
        sessionStorage.setItem('subCatName', productData.subCatName);
    }


    const addToCart=(id)=>{
        context.addToCart(id);
        setIsadded(true);
    }

    // console.log(item);
    return (
        <div className='productThumb' onClick={setProductCat}>
            {
                item.tag !== null && item.tag !== undefined &&
                <span className={`badge ${item.tag}`}>{item.tag}</span>
            }

            {
                productData !== undefined &&
                <>
                    <Link to={`/product/${productData._id}`}>
                        <div className='imgWrapper'>
                            <div className='p-4 wrapper mb-3'>
                                <img src={productData.productImage+'?im=Resize=(420,420)'} className='w-100' alt=''/>
                            </div>

                            <div className='overlay transition'>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Add to Wishlist">
                                            <FavoriteBorderOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Compare">
                                            <CompareArrowsOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Quick View">
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </Link>

                    <div className='info'>
                        <span className='d-block catName'>{productData.brand}</span>
                        <h4 className='title'><Link>{productData.productName.substr(0,50)+'...'}</Link></h4>
                        <Rating name="half-rating-read" 
                        value={parseFloat(productData.rating)} precision={0.5} readOnly />
                        <span className='brand d-block text-g'>By <Link className='text-g'>{productData.brand}</Link></span>

                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price text-g font-weight-bold'>
                                    BDT {productData.price}</span> <span className='oldPrice ml-auto'>BDT {productData.oldPrice}</span>
                            </div>
                        </div>

                        <Button className='w-100 transition mt-3' onClick={()=>addToCart(productData._id)}><ShoppingCartOutlinedIcon /> 
                            {
                                isAdded===true ? 'Added' : 'Add'
                            }
                        </Button>

                    </div>

                </>
            }






        </div>
    )
}

export default Product;