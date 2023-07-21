import React, { useState, useEffect, useRef } from "react";
import "../css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingBasket } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { useUser } from "./UserLogin";
import { Fade } from "@mui/material";
import SearchSuggestions from "./SearchSuggestions";

import { ZoomableImage, ZoomableOption } from "./ZoomableComponents";

function Header({ number, emptyall }) {
  const [search, setSearch] = useState({ query: "" });
  const [searched, setsearched] = useState([]);
  const [namevalue, setnamevalue] = useState("");
  const [clicked, setclicked] = useState(false);

  const handleClick = () => {
    setclicked(true);
  };
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      let eventComing = e.target;

      if (
        clicked &&
        menuRef.current &&
        !menuRef.current.contains(eventComing)
      ) {
        setclicked(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler); // Cleanup: remove the event listener when the component unmounts
    };
  }, [clicked]);

  const fetchData = async () => {
    const response = await fetch(
      "https://amazonapi-cnbd.onrender.com/searchData/",
      {
        method: "post",
        headers: {
          Origin: "http://localhost:3001/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      }
    );
    const jsonData = await response.json();
    setsearched(jsonData);
  };

  function onsearchChange(event) {
    setsearched([]);
    const { name, value } = event.target;
    setnamevalue(event.target.value);
    setSearch((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    fetchData();
  }
  console.log(search);
  const navigate = useNavigate();

  const handleLogout = () => {
    emptyall();
    signOut(auth)
      .then(() => {
        navigate("/");
        // Sign-out successful.

        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const user = useUser();
  console.log(user);

  return (
    <div className="header">
      <Link to="/">
        <ZoomableImage
          className="header__logo"
          alt="logo"
          imageUrl="https://pngimg.com/d/amazon_PNG11.png"
        />
      </Link>
      <div className="header__search" ref={menuRef}>
        <input
          name="query"
          value={search.query}
          className="header__searchInput"
          onChange={onsearchChange}
          onClick={handleClick}
          type="text"
          autoComplete="off"
        ></input>
        <SearchIcon className="header__searchIcon" />
        {namevalue.length > 2 && searched.length > 0 && clicked ? (
          <SearchSuggestions suggestions={searched} />
        ) : null}
      </div>

      <div className="header__navbar">
        <Link to={!user && "/login"}>
          <div onClick={user && handleLogout}>
            <ZoomableOption
              content={
                <>
                  <span className="header__optionline1">
                    Hello,
                    {!user
                      ? " Guest"
                      : " " + user.email.substring(0, user.email.indexOf("@"))}
                  </span>

                  <span className="header__optionline2">
                    {user ? "Sign Out" : "Sign In"}
                  </span>
                </>
              }
            />
          </div>
        </Link>
        {/* User Sign in */}

        <ZoomableOption
          content={
            <>
              <span className="header__optionline1">Returns</span>
              <span className="header__optionline2">& Orders</span>
            </>
          }
        />

        {/* Returns and Orders*/}

        <ZoomableOption
          content={
            <>
              <span className="header__optionline1">Your</span>
              <span className="header__optionline2">Prime</span>
            </>
          }
        />

        {/* Your Prime */}
      </div>
      <Link to="/checkout">
        <div className="header__optionbasket">
          <ZoomableOption
            className="header__optionbasket"
            content={
              <>
                <span className="header__optionline2 header__basketCount">
                  <Fade key={number} in={true} timeout={300}>
                    <small>{number}</small>
                  </Fade>
                </span>
                <ShoppingBasket />
              </>
            }
          />
        </div>
      </Link>
    </div>
  );
}

export default Header;
