import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { useState } from "react";
import Login from "./components/Login";
import { useUser } from "./components/UserLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const user = useUser();
  const storedUID = localStorage.getItem("uid");

  const [checkout, setcheckout] = useState(false);
  function pagetoRedirect(bool) {
    setcheckout(bool);
  }
  const [outitem, setoutitem] = useState([]);
  const [item, setitem] = useState([]);
  function handleAddToBasket(newNote) {
    setitem((prevNotes) => {
      return [...prevNotes, newNote];
    });
    setoutitem((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function handleRemoveToBasket(id) {
    setitem((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.del !== id;
      });
    });
    setoutitem((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.del !== id;
      });
    });
  }

  function emptyall() {
    setoutitem([]);
  }

  console.log(item);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://amazonapi-cnbd.onrender.com/customerData/" + storedUID
        );
        const jsonData = await response.json();
        setitem(jsonData);
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
                <Login page={checkout} />
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
