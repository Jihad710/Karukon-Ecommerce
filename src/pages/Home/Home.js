import React, { useState, useEffect, useRef, useContext } from 'react';
import SliderBanner from './slider/HomeSlider';
import CatSlider from '../../components/catSlider/catSlider';
import Banners from '../../components/banners/Banners';
import './style.css';
import Product from '../../components/product/Product';


import { MyContext } from '../../App';

const Home = (props) => {
    const [prodData, setProdData] = useState(props.data);
    const [catArray, setCatArray] = useState([]);
    const [activeTab, setActiveTab] = useState();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeTabData, setActiveTabData] = useState([]);
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

    useEffect(() => {
        if (prodData.length !== 0) {
            const catArr = prodData.flatMap(item => item.items.map(item_ => item_.cat_name));
            const uniqueCatArr = Array.from(new Set(catArr)); // Remove duplicates
            setCatArray(uniqueCatArr);
            setActiveTab(uniqueCatArr[0]);
            window.scrollTo(0, 0);
        }
    }, [prodData]);

    useEffect(() => {
        const arr = [];
        if (prodData.length !== 0) {
            prodData.forEach(item => {
                item.items.forEach(item_ => {
                    if (item_.cat_name === activeTab) {
                        item_.products.forEach(product => {
                            arr.push({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name });
                        });
                    }
                });
            });
            setActiveTabData(arr);
            setIsLoadingProducts(true); // Start loading
            setTimeout(() => {
                setIsLoadingProducts(false); // Stop loading after a delay
            }, 1000);
        }
    }, [activeTab, prodData]);

    useEffect(() => {
        const bestSellsArr = [];
        if (prodData.length !== 0) {
            prodData.forEach(item => {
                if (item.cat_name === "Electronics") {
                    item.items.forEach(item_ => {
                        item_.products.forEach(product => {
                            bestSellsArr.push(product);
                        });
                    });
                }
            });
            setBestSells(bestSellsArr);
        }
    }, [prodData]);

    return (
        <div style={{ display: 'block' }}>
            <SliderBanner />
            <CatSlider data={prodData} />
            <Banners />
            <section className='homeProducts homeProductWrapper'>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center homeProductsTitleWrap'>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                        <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                            {catArray.map((cat, index) => (
                                <li className="list list-inline-item" key={index}>
                                    <a
                                        className={`cursor text-capitalize ${activeTabIndex === index ? 'act' : ''}`}
                                        onClick={( ) => {
                                            setActiveTab(cat);
                                            setActiveTabIndex(index);
                                            productRow.current.scrollLeft = 0;
                                            setIsLoadingProducts(true);
                                        }}
                                    >
                                        {cat}
                                    </a>
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
