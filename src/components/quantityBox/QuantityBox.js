import React, { useState, useEffect } from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UseAxiosSecured from "../../utils/UseAxiosSecure";

const QuantityBox = ({ quantity, product }) => {
  const [inputValue, setInputValue] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const { axiosSecured } = UseAxiosSecured();
  // useEffect(() => {
  //   setInputValue(quantity);
  // }, [quantity]);
  console.log(product?._id);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axiosSecured.patch(
        `/api/users/manipulate-quantity/${product?._id}/${inputValue}`
      );
      console.log(data);
      if (data?.success) {
        setIsLoading(false);
      }
    })();
  }, [inputValue, product?._id]);

  console.log(inputValue);


  return (
    <div className='addCartSection pt-4 pb-4 d-flex align-items-center '>
      <div className='counterSec mr-3'>
        <input type='number' value={inputValue} />
        <button
          disabled={isLoading}
          className='arrow plus'
          onClick={() => setInputValue(inputValue + 1)}>
          <KeyboardArrowUpIcon />
        </button>
        <button
          disabled={isLoading}
          className='arrow minus'
          onClick={() => setInputValue(inputValue > 1 ? inputValue - 1 : 1)}>
          <KeyboardArrowDownIcon />
        </button>
      </div>
    </div>
  );
};

export default QuantityBox;
