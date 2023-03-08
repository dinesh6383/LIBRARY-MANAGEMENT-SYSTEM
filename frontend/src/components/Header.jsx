import React from "react";
import { FaRegBell } from "react-icons/fa";
import ProfileCard from "./ProfileCard";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { open, close } from "../action";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const toggleStatus = useSelector((state) => state.toggler);
  const dispatch = useDispatch();
  const handleToggler = () => {
    toggleStatus ? dispatch(close()) : dispatch(open());
  };

  return (
    <>
      <div className="fixed top-0 z-50 right-0 left-0 w-[100%] h-[50px] flex justify-around items-center py-10 md:py-7 border-b-[1px] border-b-slate-500 shadow-xl bg-slate-800">
        <Link to={"/books"}>
          <p className="font-extrabold text-4xl md:text-3xl text-white">
            UpTime
          </p>
        </Link>
        <SearchBar />
        <div className="flex justify-end items-center w-[20%] md:hidden">
          <div className="mr-10 text-xl text-white">
            <FaRegBell />
          </div>
          <p
            onClick={() => navigate("/favourite")}
            className="text-lg font-semibold mr-10 text-slate-50 cursor-pointer underline"
          >
            Favourites
          </p>
          <p
            onClick={handleToggler}
            className="text-lg font-semibold text-slate-50 cursor-pointer underline"
          >
            Profile
          </p>
        </div>
      </div>
      <div className="">
        <ProfileCard />
      </div>
    </>
  );
};

export default Header;
