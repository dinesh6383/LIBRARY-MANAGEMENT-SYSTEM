import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExtrasInfoCard from "./ExtrasInfoCard";
import { logout } from "../action";

const UserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const extrasInfo = useSelector((state) => state.extras);
  const { user } = userInfo;
  const book = [];
  const cards = ["Book in Hand", "Rented History", "Requested Books"];
  const [visible, setVisible] = useState("");

  const handleVisibility = (value) => {
    if (value !== visible) {
      setVisible(value);
    } else {
      setVisible("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  const handleDashboard = () => {
    window.open(
      `https://library-management-system-client.onrender.com/admin/dashboard`
    );
    window.document.title = "Admin Dashboard";
  };

  return (
    <>
      <p className="text-lg text-gray-300 font-semibold bg-pink-800 py-2 px-2 rounded-md sm:w-[100%] sm:mt-5">
        Hello, <span className="text-white">{user?.username}</span>
      </p>
      <div className="flex justify-center items-start flex-col">
        {/* {cards.map((val) => {
          return (
            <ExtrasInfoCard
              card={val}
              book={book}
              handle={handleVisibility}
              visible={visible}
            />
          );
        })} */}
        <ExtrasInfoCard
          card={"Book in Hand"}
          book={extrasInfo?.bookInHand}
          handle={handleVisibility}
          visible={visible}
        />
        <ExtrasInfoCard
          card={"Requested Books"}
          book={extrasInfo?.requestedBooks}
          handle={handleVisibility}
          visible={visible}
        />
        <ExtrasInfoCard
          card={"Rented History"}
          book={extrasInfo?.rentedHistory}
          handle={handleVisibility}
          visible={visible}
        />
      </div>
      <div className="flex flex-col justify-center items-start mt-5">
        {user?.isAdmin && (
          <button
            onClick={handleDashboard}
            className="p-3 w-[100%] rounded-md bg-emerald-600 text-white font-semibold text-lg shadow-sm"
          >
            View Dashboard
          </button>
        )}
        <button
          onClick={handleLogout}
          className="p-3 mt-3 w-[100%] rounded-md bg-red-500 text-white font-semibold text-lg shadow-sm"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserInfo;

/*
<div
onClick={() => handleVisibility("book-in-hand")}
className=" bg-gradient-to-r from-slate-600 to-slate-500 text-white font-semibold flex justify-between items-center  shadow-sm p-3 w-[100%] mt-5 rounded-md cursor-pointer"
>
<p>Books In Hand</p>
<AiOutlineDown />
</div>
<div
style={{ display: visible === "book-in-hand" ? "block" : "none" }}
className="w-[100%] h-[100%] px-3 py-4 bg-slate-400 mt-2 rounded-md"
>
{book.length > 0 ? (
  book.map((val) => {
    return (
      <p className="border-b-[1px]  border-gray-500 py-3">
        {" "}
        {val.bookname} <br />
        <span className="text-slate-700 text-sm">by {val.autor}</span>
      </p>
    );
  })
) : (
  <>
    <img
      className="w-[150px] h-[150px] mx-auto"
      src={blank}
      alt="blank"
    ></img>
    <p className="text-center font-bold text-slate-900">
      Nothing to show!
    </p>
  </>
)}
</div>
<div
onClick={() => handleVisibility("rented-history")}
className=" bg-gradient-to-br from-bg-gradient-to-r from-slate-600 to-slate-500 text-white font-semibold flex justify-between items-center shadow-sm p-3 w-[100%] mt-5 rounded-md cursor-pointer"
>
<p>Rented History</p>
<AiOutlineDown />
</div>
<div
style={{ display: visible === "rented-history" ? "block" : "none" }}
className="w-[100%] h-[100%] px-3 py-4 bg-slate-400 mt-2 rounded-md"
>
{book.length > 0 ? (
  book.map((val) => {
    return (
      <p className="border-b-[1px]  border-gray-500 py-3">
        {" "}
        {val.bookname} <br />
        <span className="text-slate-700 text-sm">by {val.autor}</span>
      </p>
    );
  })
) : (
  <>
    <img
      className="w-[150px] h-[150px] mx-auto"
      src={blank}
      alt="blank"
    ></img>
    <p className="text-center font-bold text-slate-900">
      Nothing to show!
    </p>
  </>
)}
</div>
<div
onClick={() => handleVisibility("requested-books")}
className=" bg-gradient-to-br from-bg-gradient-to-r from-slate-600 to-slate-500 text-white font-semibold flex justify-between items-center  shadow-sm p-3 w-[100%] mt-5 rounded-md cursor-pointer"
>
<p>Requested Books</p>
<AiOutlineDown />
</div>
<div
style={{ display: visible === "requested-books" ? "block" : "none" }}
className="w-[100%] h-[100%] px-3 py-4 bg-slate-400 mt-2 rounded-md"
>
{book.length > 0 ? (
  book.map((val) => {
    return (
      <>
        <p className="border-b-[1px]  border-gray-500 py-3">
          {" "}
          {val.bookname} <br />
          <span className="text-slate-700 text-sm">
            by {val.autor}
          </span>
        </p>
      </>
    );
  })
) : (
  <>
    <img
      className="w-[150px] h-[150px] mx-auto"
      src={blank}
      alt="blank"
    ></img>
    <p className="text-center font-bold text-slate-900">
      Nothing to show!
    </p>
  </>
)}
</div>
*/
