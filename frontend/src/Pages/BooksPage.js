import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import BookSlider from "../components/BookSlider";
import { useSelector, useDispatch } from "react-redux";
import { addInitFavBooks } from "../action";
import axios from "axios";

const BooksPage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const users = useSelector((state) => state.user);
  const toggler = useSelector((state) => state.toggler);
  const [favMsg, setFavMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const getFavsFromAPI = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/getfav/${users?.user?.id}`
      );
      dispatch(addInitFavBooks(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    users?.user && getFavsFromAPI();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{ position: !toggler?.status ? "relative" : "fixed" }}
        className="w[100%] h-max bg-gradient-to-b from-gray-800 to-gray-700 pt-[130px] pl-20 md:pl-5 md:pt-[80px] pb-20"
      >
        <p
          style={{
            translate: favMsg || errMsg ? "0%" : "-100%",
            background: favMsg ? "green" : "red",
          }}
          className="z-50 fixed top-24 left-0 p-2 pl-5 text-lg  ease-in-out duration-300 text-white shadow-lg border-[2px] border-emerald-900"
        >
          {favMsg ? "Book Added to FAV!" : "Already in your FAV!"}
        </p>
        {/* Personal Growth */}
        <BookSlider
          data={books?.books?.filter((data) => data.type === "Personal Growth")}
          title={"Personal Growth"}
          setFavMsg={setFavMsg}
          setErrMsg={setErrMsg}
        />
        {/* History */}
        <BookSlider
          data={books?.books?.filter((data) => data.type === "History")}
          title={"History"}
          setFavMsg={setFavMsg}
          setErrMsg={setErrMsg}
        />
        {/* Leadership and Entrepreneur */}
        <BookSlider
          data={books?.books?.filter(
            (data) => data.type === "Leadership & Entrepreneurs"
          )}
          title={"Leadership & Entrepreneur"}
          setFavMsg={setFavMsg}
          setErrMsg={setErrMsg}
        />
        {/* Technology */}
        <BookSlider
          data={books?.books?.filter((data) => data.type === "Technology")}
          title={"Technology"}
          setFavMsg={setFavMsg}
          setErrMsg={setErrMsg}
        />
        {/* Health and Fitness */}
        <BookSlider
          data={books?.books?.filter(
            (data) => data.type === "Health and Fitness"
          )}
          title={"Health and Fitness"}
          setFavMsg={setFavMsg}
          setErrMsg={setErrMsg}
        />
      </div>
      <MobileNav />
    </>
  );
};

export default BooksPage;
