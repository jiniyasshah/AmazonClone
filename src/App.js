import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { useUser } from "./components/UserLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const user = useUser();

  const [checkout, setcheckout] = useState(false);
  function pagetoRedirect(bool) {
    setcheckout(bool);
  }
  const [outitem, setoutitem] = useState([]);
  const [item, setitem] = useState([]);

  const handleAddToBasket = async (newNote) => {
    const doesNoteExist = item.some((note) => note.id === newNote.id);
    if (!doesNoteExist) {
      setitem((prevNotes) => {
        return [...prevNotes, newNote];
      });
      setoutitem((prevNotes) => {
        return [...prevNotes, newNote];
      });

      localStorage.setItem("item", JSON.stringify(item));
      try {
        const response = await fetch(
          "https://amazonapi-cnbd.onrender.com/customerData/",
          {
            method: "post",
            headers: {
              Origin: "http://localhost:3001/",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
          }
        );
        console.log(response);
        // Handle the response as needed
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleRemoveToBasket = async (bask) => {
    setitem((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== bask.id;
      });
    });
    setoutitem((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== bask.id;
      });
    });

    try {
      const storedUID = localStorage.getItem("uid");
      const response = await fetch(
        "https://amazonapi-cnbd.onrender.com/customerData/" + storedUID,
        {
          method: "delete",
          headers: {
            Origin: "http://localhost:3001/",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bask),
        }
      );
      console.log(response);
    } catch (error) {
      // Handle error
    }
  };
  localStorage.setItem("item", JSON.stringify(item));

  function emptyall() {
    const afterloggedout = Math.floor(Math.random() * 7000000001);
    localStorage.setItem("uid", afterloggedout);
    localStorage.setItem("uid1", afterloggedout);

    setoutitem([]);
    localStorage.setItem("item", JSON.stringify(outitem));
  }
  const storedUID = localStorage.getItem("uid");
  const storedUID1 = localStorage.getItem("uid1");

  console.log(item);
  useEffect(() => {
    if (!storedUID && !storedUID1 && !user) {
      const afterloggedout = Math.floor(Math.random() * 7000000001);
      localStorage.setItem("uid", afterloggedout);
      localStorage.setItem("uid1", afterloggedout);
      setoutitem([]);
    }

    const loggeduser = storedUID + "/" + storedUID1;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://amazonapi-cnbd.onrender.com/customerData/" +
            (user ? loggeduser : storedUID)
        );
        const jsonData = await response.json();

        setitem(jsonData);
        setoutitem(jsonData);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [storedUID]);

  console.log(item);

  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login page={checkout} outitem={outitem} />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Register page={checkout} />
              </>
            }
          />

          <Route
            path="/checkout"
            element={
              <>
                <Header
                  number={user ? item.length : outitem.length}
                  emptyall={emptyall}
                />
                <Checkout
                  redirect={pagetoRedirect}
                  items={user ? item : outitem}
                  removeItem={handleRemoveToBasket}
                />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <Header
                  number={user ? item.length : outitem.length}
                  emptyall={emptyall}
                />
                <Home
                  redirect={pagetoRedirect}
                  onAddToBasket={handleAddToBasket}
                  onRemoveToBasket={handleRemoveToBasket}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
