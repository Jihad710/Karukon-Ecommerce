import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './responsive.css';

import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './pages/Home/Home';

import axios from 'axios';
import Loader from './assets/images/loading.gif';
import DetailsPage from './pages/Details/DetailsPage';
import Listing from './pages/Listing';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Cart from './pages/cart/Cart';

import data from './data';
import Order from './pages/Order/Order';
import UseAxiosSecured from './utils/UseAxiosSecure';

const MyContext = createContext();

function App() {
	const [productData, setProductData] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [isLoading, setIsloading] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const [isopenNavigation, setIsopenNavigation] = useState(false);

	const [isLogin, setIsLogin] = useState();
	const [isOpenFilters, setIsopenFilters] = useState(false);

	useEffect(() => {
		// getData('http://localhost:5000/productData');
		// getCartData("http://localhost:5000/cartItems");

		const is_Login = localStorage.getItem('isLogin');
		setIsLogin(is_Login);

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
					'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=27dad2d0abd34a22965727ce8d939077'
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

	const addToCart = (id) => {
		const cartItem = JSON.parse(localStorage.getItem('ChitropotCart'));
		console.log(cartItem);
		if (cartItem?.length > 0) {
			const isCart = cartItem?.find((item) => item === id);
			console.log(isCart);
			if (!isCart) {
				const totalCart = [...cartItem, id];
				localStorage.setItem('ChitropotCart', JSON.stringify(totalCart));
			}
		} else {
			localStorage.setItem('ChitropotCart', JSON.stringify([id]));
		}

		// try {
		//  const res =  await axios.post("http://localhost:5000/cartItems", id)

		//     if (res !== undefined) {
		//       setCartItems([...cartItems, { ...id, quantity: 1 }])
		//     }
		// } catch (error) {
		//   console.log(error)
		// }
	};

	const removeItemsFromCart = (id) => {
		const arr = cartItems.filter((obj) => obj.id !== id);
		setCartItems(arr);
	};

	const emptyCart = () => {
		setCartItems([]);
	};

	const signIn = () => {
		const is_Login = localStorage.getItem('isLogin');
		setIsLogin(is_Login);
	};

	const signOut = () => {
		localStorage.removeItem('isLogin');
		setIsLogin(false);
	};

	const openFilters = () => {
		setIsopenFilters(!isOpenFilters);
	};

	const value = {
		productData,
		cartItems,
		isLogin,
		windowWidth,
		isOpenFilters,
		addToCart,
		removeItemsFromCart,
		emptyCart,
		signOut,
		signIn,
		openFilters,
		isopenNavigation,
		setIsopenNavigation
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
						<Route exact={true} path='/' element={<Home data={data.productData} />} />
						<Route exact={true} path='/cat/:id' element={<Listing data={data.productData} single={true} />} />
						<Route exact={true} path='/cat/:id/:id' element={<Listing data={data.productData} single={false} />} />
						<Route exact={true} path='/product/:id' element={<DetailsPage data={data.productData} />} />
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
