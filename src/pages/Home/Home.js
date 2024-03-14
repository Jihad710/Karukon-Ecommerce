import React, { useState, useEffect, useRef, useContext } from 'react';
import SliderBanner from './slider/HomeSlider';
import CatSlider from '../../components/catSlider/catSlider';
import Banners from '../../components/banners/Banners';
import './style.css';
import Product from '../../components/product/Product';


import { MyContext } from '../../App';
import axios from 'axios';

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("");
    const [activeTabData, setActiveTabData] = useState([]);
console.log(currentCategory);
    const [activeTab, setActiveTab] = useState();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [bestSells, setBestSells] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const productRow = useRef();
    const context = useContext(MyContext);

    var settings = {
        dots: false,
        infinite: context.windowWidth < 992 ? false : true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth < 992 ? false : true,
    };
    // load product  =====================
    useEffect(() => {
        (async()=>{
            const {data} = await axios(`https://chitropot-server-b90ctxvzy-jmjubaers-projects.vercel.app/category?category=${currentCategory}`)
            if(data?.length > 0){
                setActiveTabData(data);
            }
        })()
    }, [currentCategory]);    
    

    useEffect(()=>{
        (async()=>{
            const {data} = await axios.get("https://chitropot-server-b90ctxvzy-jmjubaers-projects.vercel.app/products")
            // Create a map to store one product per category
            const productCategory = new Map();
            // Iterate over each product and add the first product of each category to the map
            data?.forEach(product => {
                if (!productCategory.has(product.categoryName)) {
                    productCategory.set(product.categoryName, product);
                }
            });
            // Convert the map values back to an array
            const totalCategory = Array.from(productCategory.values());
    
            if(totalCategory?.length > 0){
                setAllCategory(totalCategory)
                setCurrentCategory(totalCategory[0]?.categoryName)
            }

        })()
    },[])




    // useEffect(() => {
    //     if (products.length !== 0) {
    //         const catArr = products.flatMap(item => item.items.map(item_ => item_.categoryName));
    //         const uniqueCatArr = Array.from(new Set(catArr)); // Remove duplicates
    //         setCatArray(uniqueCatArr);
    //         setActiveTab(uniqueCatArr[0]);
    //         window.scrollTo(0, 0);
    //     }
    // }, [products]);

    // useEffect(() => {
    //     const arr = [];
    //     if (products.length !== 0) {
    //         products.forEach(item => {
    //             if (item.categoryName === activeTab) {
    //                     arr.push({ ...item});
    //             }
    //         });
    //         setActiveTabData(arr);
    //         setIsLoadingProducts(true); // Start loading
    //         setTimeout(() => {
    //             setIsLoadingProducts(false); // Stop loading after a delay
    //         }, 1000);
    //     }
    // }, [activeTab, products]);
    // console.log(activeTab);

    // useEffect(() => {
    //     const bestSellsArr = [];
    //     if (products.length !== 0) {
    //         products.forEach(item => {
    //             if (item.categoryName === "Electronics") {
    //                 item.items.forEach(item_ => {
    //                     item_.products.forEach(product => {
    //                         bestSellsArr.push(product);
    //                     });
    //                 });
    //             }
    //         });
    //         setBestSells(bestSellsArr);
    //     }
    // }, [products]);

    return (
        <div style={{ display: 'block' }}>
            <SliderBanner />
            {/* <CatSlider products={products} /> */}
            <Banners />
            <section className='homeProducts homeProductWrapper'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center homeProductsTitleWrap'>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                        <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                            {allCategory?.map((category, index) => (
                                <li className="list list-inline-item" key={index}>
                                    <button
                                        className={`cursor btn text-capitalize ${category?.categoryName === currentCategory && 'act'}`
                                    }
                                    // ${activeTabIndex === index ? 'act' : ''}
                                        onClick={() => {
                                            setCurrentCategory(category?.categoryName)
                                            // setActiveTab(category);
                                            // setActiveTabIndex(index);
                                            // productRow.current.scrollLeft = 0;
                                            // setIsLoadingProducts(true);
                                        }}
                                        
                                    >
                                        {category?.categoryName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`productRow ${isLoadingProducts === true && 'loading'}`} ref={productRow}>
                        {activeTabData.map((item, index) => (
                            <div className='item' key={index}>
                                <Product tag={item.type} item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
         
    
        </div>
    )
}

export default Home;
