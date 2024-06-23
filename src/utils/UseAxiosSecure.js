// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const axiosSecured = axios.create({
  baseURL: "https://karukon-server.vercel.app",
});

const UseAxiosSecured = () => {
  //   const navigate = useNavigate();
  useEffect(() => {
    axiosSecured.interceptors.request.use((config) => {
      const token = JSON.parse(localStorage.getItem("karukon-access-token"));
      // console.log(token?.accessToken);
      if (token) {
        config.headers.Authorization = `${token?.accessToken}`;
      }
      return config;
    });
    // axiosSecured.interceptors.response.use((response) => response,
    //     async(error) => {
    //         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //             // await LogOut();
    //             navigate('/login')
    //         }
    //     }
    // )
  }, [axiosSecured]);
  return { axiosSecured };
};

export default UseAxiosSecured;
