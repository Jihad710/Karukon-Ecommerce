import React, { useContext} from 'react';
import Slider from "react-slick";
import './index.css';

import { MyContext } from '../../../App';

const HomeSlider = () => {

    const context = useContext(MyContext);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: context.windowWidth>992 ? true : false,
        autoplay:true
    };



    return (
        <section className='homeSlider'>
            <div className='container-fluid position-relative'>
                <Slider {...settings} className='home_slider_Main'>
                    <div className="item">
                        <img src="https://cynor.b-cdn.net/wp-content/uploads/2023/10/Best-Price-Quality-Desktop-1.jpg" className='w-100' />
                      
                    </div>
                    <div className="item">
                        <img src="https://cynor.b-cdn.net/wp-content/uploads/2023/10/Urgent-Gift-Delivery-Desktop.jpg" className='w-100' />
                   
                    </div>
                    <div className="item">
                        <img src="https://cynor.b-cdn.net/wp-content/uploads/2023/10/Return-Policy-Desktop.jpg" className='w-100' />
                   
                    </div>
                    <div className="item">
                        <img src="https://cynor.b-cdn.net/wp-content/uploads/2023/10/Inside-Dhaka-Delivery-Desktop.jpg" className='w-100' />
                   
                    </div>
                </Slider>

                
                

            </div>
        </section>
    )
}

export default HomeSlider;