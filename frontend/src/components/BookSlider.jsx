import React, { useState } from "react";
import axios from "axios";
import { BsStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import star from "../assets/star-dynamic-premium.png";
import CardTemplate from "./CardTemplate";
import { addProgFavBooka, open } from "../action";

const BookSlider = ({ data, title, setFavMsg, setErrMsg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggler = useSelector((state) => state.toggler);
  const userInfo = useSelector((state) => state.user);
  const books = useSelector((state) => state.books);
  const handleBook = (value) => {
    navigate(`/book/${value?._id}`);
  };

  const handleFav = async (value) => {
    try {
      if (userInfo?.user) {
        const dataToSend = {
          userId: userInfo?.user?.id,
          bookId: value?._id,
        };
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/user/addFav`,
          dataToSend
        );
        setFavMsg(response?.data?.message);
        dispatch(addProgFavBooka(value?._id));
        setTimeout(() => setFavMsg(""), 3000);
      } else {
        dispatch(open());
      }
    } catch (err) {
      setErrMsg(err?.response?.data?.message);
      setTimeout(() => setErrMsg(""), 3000);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-3xl sm:text-2xl font-bold text-slate-200">{title}</p>
      <div className="flex justify-start items-center p-1 overflow-x-auto no-scrollbar">
        {data ? (
          data?.map((data, idx) => {
            return (
              <div key={idx} className="mx-2 md:mx-1 cursor-pointer">
                <div
                  onClick={() => handleBook(data)}
                  className="w-[200px] sm:w-[150px] h-[300px] sm:h-[200px]"
                >
                  <img
                    alt={data?.bookname.slice(0, 5)}
                    className="w-[100%] h-[100%] object-cover rounded-sm"
                    src={data?.bookImage}
                  ></img>
                </div>
                <div className="flex justify-between items-center pr-2">
                  <div className="flex justify-around items-center bg-gradient-to-r from-emerald-600 to-emerald-300 w-max px-2 mt-1.5 ml-[1px] rounded-sm">
                    <img
                      alt={data?.bookImage}
                      className="w-6 rotate-6 -ml-1"
                      src={star}
                    ></img>
                    <p className="ml-1 font-bold text-slate-800">
                      {data?.rating}
                    </p>
                  </div>
                  <div
                    style={{
                      color: books?.favourite?.includes(data?._id)
                        ? "orange"
                        : "white",
                    }}
                    onClick={() => handleFav(data)}
                    className="z-10 mt-1"
                  >
                    <BsStarFill />
                  </div>
                </div>
                <p className="mt-1 font-bold sm:font-semibold text-white text-lg sm:text-sm">
                  {data?.bookname.slice(0, 17)}...
                </p>
                <p className="text-slate-200 text-sm">{data?.authorname}</p>
                <p className="text-white font-semibold mt-1">
                  ₹ {data?.price}/day
                </p>
              </div>
            );
          })
        ) : (
          <CardTemplate />
        )}
      </div>
    </div>
  );
};

export default BookSlider;
