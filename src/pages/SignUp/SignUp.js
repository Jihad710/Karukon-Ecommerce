import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

import TextField from "@mui/material/TextField";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Button } from "@mui/material";
import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UseAxiosSecured from "../../utils/UseAxiosSecure";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const SignUp = () => {
  const { axiosSecured } = UseAxiosSecured();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const [formFields, setFormFields] = useState({
    email: null,
    firstName: null,
    lastName: null,
    password: null,
    conformPassword: null,
  });

  const signUp = async (e) => {
    e.preventDefault();
    const data = e.target;
    const userData = {
      name: {
        firstName: data?.firstName?.value,
        lastName: data?.lastName?.value,
      },
      email: data?.email?.value,
      password: data?.password?.value,
    };
    console.log(userData);
    try {
      setShowLoader(true);
      if (data?.password?.value?.length < 8) {
        toast.warning("Password Must be at least 8 characters");
        setShowLoader(false);
        return;
      }
      if (!/(?=.*[A-Z])/.test(data?.password?.value)) {
        toast("Password Must have a capital letter");
        setShowLoader(false);
        return;
      }

      if (!/^(?=.*[!@#$&*])/.test(data?.password?.value)) {
        toast("Password Must have a special character");
        setShowLoader(false);
        return;
      }
      if (data?.password?.value === data?.conformPassword?.value) {
        const res = await axios.post(
          "https://karukon-server.vercel.app/api/users",
          userData
        );
        if (res.data?.success) {
          setShowLoader(false);
          setFormFields({
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            conformPassword: null,
          });
          Swal.fire({
            icon: "success",
            title: "Signup Successful, Please login now!",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/signIn");
        }
        console.log(res.data.data);
      } else {
        toast.warning("Password dose not match!");
        setShowLoader(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setShowLoader(false);
    }
  };

  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields(() => ({
      ...formFields,
      [name]: value,
    }));
  };

  return (
    <>
      <section className='signIn mb-5'>
        <div className='breadcrumbWrapper res-hide'>
          <div className='container-fluid'>
            <ul className='breadcrumb breadcrumb2 mb-0'>
              <li>
                <Link to='/'>Home</Link>{" "}
              </li>
              <li>SignUp</li>
            </ul>
          </div>
        </div>

        <div className='loginWrapper'>
          <div className='card shadow'>
            <Backdrop
              sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showLoader}
              className='formLoader'>
              <CircularProgress color='inherit' />
            </Backdrop>

            <h3>SignUp</h3>
            <form onSubmit={signUp} className='mt-4'>
              <div className='jm-form-group mb-4 w-100'>
                <TextField
                  required
                  requiredError='FirstName is a required field.'
                  id='firstName'
                  type='text'
                  name='firstName'
                  label='First Name'
                  className='w-100'
                  onChange={onChangeField}
                  value={formFields.firstName}
                />
                <TextField
                  id='lastName'
                  required
                  type='text'
                  name='lastName'
                  label='Last Name'
                  className='w-100'
                  onChange={onChangeField}
                  value={formFields.lastName}
                />
              </div>
              <div className='form-group mb-4 w-100'>
                <TextField
                  id='email'
                  required
                  type='email'
                  name='email'
                  label='Email'
                  className='w-100'
                  onChange={onChangeField}
                  value={formFields.email}
                />
              </div>
              <p style={{ fontSize: "20px" }}>
                Password must be 8 length, a-z, A-Z,0-9,@#$%&!
              </p>
              <div className='form-group mb-4 w-100'>
                <div className='position-relative'>
                  <TextField
                    id='outlined-error'
                    required
                    type={showPassword === false ? "password" : "text"}
                    name='password'
                    label='Password'
                    className='w-100'
                    // inputProps={{
                    //   pattern:
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&\\*])(?=.{8,})/,
                    // }}
                    onChange={onChangeField}
                    value={formFields.password}
                  />
                  <Button
                    className='icon'
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
              </div>
              <div className='form-group mb-4 w-100'>
                <div className='position-relative'>
                  <TextField
                    id='conformPassword'
                    type={showPassword1 === false ? "password" : "text"}
                    name='conformPassword'
                    label='Confirm Password'
                    required
                    className='w-100'
                    onChange={onChangeField}
                    value={formFields.conformPassword}
                  />
                  <Button
                    className='icon'
                    onClick={() => setShowPassword1(!showPassword1)}>
                    {showPassword1 === false ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </Button>
                </div>
              </div>

              <div className='form-group mt-5 mb-4 w-100'>
                <button type='submit' className='btn btn-g btn-lg w-100'>
                  Sign Up
                </button>
              </div>

              <p className='text-center'>
                Already have an account
                <b>
                  {" "}
                  <Link to='/signIn'>Sign In</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
