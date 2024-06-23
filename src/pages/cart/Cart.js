import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import QuantityBox from "../../components/quantityBox/QuantityBox";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MyContext } from "../../App";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosSecured from "../../utils/UseAxiosSecure";
import Loader from "../../assets/images/loading.gif";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  const [Refetch, setRefetch] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { axiosSecured } = UseAxiosSecured();

  useEffect(() => {
    (async () => {
      if (context.isLogin) {
        const { data } = await axiosSecured("/api/users/auth/me");
        // console.log(data);
        if (data?.success) {
          setCartItems(data?.data?.cart);
        }
      }
      if (!context.isLogin && context?.isLoading) {
        navigate("/");
      }
    })();
    window.scrollTo(0, 0);
  }, [Refetch, context.isLogin, context?.isLoading]);

  const getCartData = (url) => {
    const cartItemId = JSON.parse(localStorage.getItem("ChitropotCart"));
    // const cartItem = products.filter(item => item.id === cartItemId)
    // console.log(cartItem);
  };

  const deleteItem = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        (async () => {
          const { data } = await axiosSecured.patch(
            `/api/users/remove-from-cart/${id}`
          );
          if (data?.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your cart item has been deleted.",
              icon: "success",
            });
            setRefetch(!Refetch);
          }
          // console.log(data);
        })();
      }
    });
  };

  const emptyCart = () => {
    const cartItemId = JSON.parse(localStorage.getItem("ChitropotCart"));
    if (cartItemId?.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          setRefetch(!Refetch);
          Swal.fire({
            title: "Deleted!",
            text: "Your all cart item has been deleted.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        // position: "top-end",
        icon: "warning",
        title: "There has no item in cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // let response = null;
    // cartItems.length !== 0 &&
    //     cartItems.map((item) => {
    //         response = axios.delete(`https://chitropot-server.vercel.app/cartItems/${parseInt(item.id)}`);
    //     })
    // if (response !== null) {
    //     getCartData("https://chitropot-server.vercel.app/cartItems");
    // }

    // context.emptyCart();
  };

  const updateCart = (items) => {
    setCartItems(items);
  };

  if (context?.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {context.windowWidth > 992 && (
        <div className='breadcrumbWrapper mb-4'>
          <div className='container-fluid'>
            <ul className='breadcrumb breadcrumb2 mb-0'>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Shop</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
      )}

      {!context.isLoading ? (
        <section className='cartSection mb-5'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-8'>
                <div className='d-flex align-items-center w-100'>
                  <div className='left'>
                    <h1 className='hd mb-0'>Your Cart</h1>
                    <p>
                      There are <span className='text-g'>3</span> products in
                      your cart
                    </p>
                  </div>

                  <span
                    className='ml-auto clearCart d-flex align-items-center cursor '
                    onClick={() => emptyCart()}>
                    <DeleteOutlineOutlinedIcon /> Clear Cart
                  </span>
                </div>

                <div className='cartWrapper mt-4'>
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Unit Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th>Remove</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartItems.length > 0 &&
                          !context.isLoading &&
                          cartItems.map(({ product, quantity }, index) => {
                            return (
                              <tr>
                                <td width={"50%"}>
                                  <div className='d-flex align-items-center'>
                                    <div className='img'>
                                      <Link to={`/product/${product?.id}`}>
                                        <img
                                          alt=''
                                          src={
                                            product?.primary_image +
                                            "?im=Resize=(100,100)"
                                          }
                                          className='w-100'
                                        />
                                      </Link>
                                    </div>

                                    <div className='info pl-4'>
                                      <Link to={`/product/${product?.id}`}>
                                        <h4>{product?.name}</h4>
                                      </Link>
                                      {/* <Rating
                name='half-rating-read'
                value={parseFloat(item.rating)}
                precision={0.5}
                readOnly
              />{" "}
              <span className='text-light'>
                ({parseFloat(item.rating)})
              </span> */}
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <span>
                                    BDT: {parseInt(product?.last_price)}
                                  </span>
                                </td>

                                <td>
                                  <QuantityBox
                                  product={product}
                                    quantity={quantity}
                                    updateCart={updateCart}
                                  />
                                </td>

                                <td>
                                  <span className='text-g'>
                                    BDT.{" "}
                                    {parseInt(product?.last_price) * quantity}
                                  </span>
                                </td>

                                <td align='center'>
                                  <span
                                    className='cursor'
                                    onClick={() => deleteItem(product?._id)}>
                                    <DeleteOutlineOutlinedIcon />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <br />

                <div className='d-flex align-items-center'>
                  <Link to='/'>
                    <Button className='btn-g'>
                      <KeyboardBackspaceIcon /> Continue Shopping
                    </Button>
                  </Link>
                  {/* <Button className='btn-g ml-auto' onClick={updateCartData}>
<RefreshIcon /> Update Cart</Button> */}
                </div>
              </div>

              <div className='col-md-4 cartRightBox'>
                <div className='card p-4 '>
                  <div className='d-flex align-items-center mb-4'>
                    <h5 className='mb-0 text-light'>Subtotal</h5>
                    <h3 className='ml-auto mb-0 font-weight-bold'>
                      <span className='text-g'>
                        {cartItems.length !== 0
                          ? cartItems
                              .map(
                                ({ product, quantity }) =>
                                  parseInt(product?.last_price) * quantity
                              )
                              ?.reduce((total, value) => total + value, 0)
                          : 0}
                      </span>
                    </h3>
                  </div>

                  <div className='d-flex align-items-center mb-4'>
                    <h5 className='mb-0 text-light'>Shipping</h5>
                    <h3 className='ml-auto mb-0 font-weight-bold'>
                      <span>Free</span>
                    </h3>
                  </div>

                  <div className='d-flex align-items-center mb-4'>
                    <h5 className='mb-0 text-light'>Estimate for</h5>
                    <h3 className='ml-auto mb-0 font-weight-bold'>
                      Bangladesh
                    </h3>
                  </div>

                  <div className='d-flex align-items-center mb-4'>
                    <h5 className='mb-0 text-light'>Total</h5>
                    <h3 className='ml-auto mb-0 font-weight-bold'>
                      <span className='text-g'>
                        {cartItems.length !== 0
                          ? cartItems
                              ?.map(
                                ({ product, quantity }) =>
                                  parseInt(product?.last_price) * quantity
                              )
                              ?.reduce((total, value) => total + value, 0)
                          : 0}
                      </span>
                    </h3>
                  </div>

                  <br />
                  <Button
                    onClick={() => navigate("/order")}
                    className='btn-g btn-lg'>
                    Proceed To CheckOut
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className='loader'>
          <img alt='' src={Loader} />
        </div>
      )}
    </>
  );
};

export default Cart;
