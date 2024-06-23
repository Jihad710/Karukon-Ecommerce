import React, { useEffect, useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/Home/Home";

import Listing from "./pages/Listing";
import NotFound from "./pages/NotFound";
import DetailsPage from "./pages/Details/DetailsPage";
import axios from "axios";
import Cart from "./pages/cart/Cart";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Loader from "./assets/images/loading.gif";

import data from "./data";
import Order from "./pages/Order/Order";
import UseAxiosSecured from "./utils/UseAxiosSecure";

const MyContext = createContext();

function App() {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isopenNavigation, setIsopenNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenFilters, setIsopenFilters] = useState(false);
  const { axiosSecured } = UseAxiosSecured();
  useEffect(() => {
    // getData('https://chitropot-server.vercel.app/productData');
    // getCartData("https://chitropot-server.vercel.app/cartItems");

    const is_Login = localStorage.getItem("karukon-access-token");
    // console.log(JSON.parse(is_Login?.accessToken));
    if (is_Login) {
      setIsloading(false)
      setIsLogin(true);
    }

    setTimeout(() => {
      setProductData(data[1]);
      setIsloading(false);
    }, 3000);
  }, []);

  const getData = async (url) => {
    try {
      await axios.get(url).then((response) => {
        setProductData(response.data);
        setTimeout(() => {
          setIsloading(false);
        }, 2000);
      });

      await axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=27dad2d0abd34a22965727ce8d939077"
        )
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCartData = async (url) => {
    // try {
    //   await axios.get(url).then((response) => {
    //     setCartItems(response.data);
    //   })
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const addToCart = async (data) => {
    try {
      const res = await axiosSecured.patch("/api/users/add-to-cart", data);
      console.log(res?.data);
      // if (res !== undefined) {
      //   setCartItems([...cartItems, { ...id, quantity: 1 }]);
      // }

    } catch (error) {
      console.log(error);
    }
  };

  const removeItemsFromCart = (id) => {
    const arr = cartItems.filter((obj) => obj.id !== id);
    setCartItems(arr);
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const signIn = () => {
    const is_Login = localStorage.getItem("isLogin");
    setIsLogin(is_Login);
  };

  const signOut = () => {
    localStorage.removeItem("karukon-access-token");
    setIsLogin(false);
  };

  const openFilters = () => {
    setIsopenFilters(!isOpenFilters);
  };

  const value = {
    productData,
    cartItems,
    isLogin,
    setIsLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isopenNavigation,
    setIsopenNavigation,
  };

  return (
    data.productData.length !== 0 && (
      <BrowserRouter>
        <MyContext.Provider value={value}>
          {isLoading === true && (
            <div className='loader'>
              <img alt='' src={Loader} />
            </div>
          )}

          <Header data={data.productData} />
          <Routes>
            <Route
              exact={true}
              path='/'
              element={<Home data={data.productData} />}
            />
            <Route
              exact={true}
              path='/cat/:id'
              element={<Listing data={data.productData} single={true} />}
            />
            <Route
              exact={true}
              path='/cat/:id/:id'
              element={<Listing data={data.productData} single={false} />}
            />
            <Route
              exact={true}
              path='/product/:id'
              element={<DetailsPage data={data.productData} />}
            />
            <Route exact={true} path='/cart' element={<Cart />} />
            <Route exact={true} path='/order' element={<Order />} />
            <Route exact={true} path='/signIn' element={<SignIn />} />
            <Route exact={true} path='/signUp' element={<SignUp />} />
            <Route exact={true} path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
    )
  );
}

export default App;

export { MyContext };
