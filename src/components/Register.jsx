import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "./Firebase";

function Register({ page }) {
  const preerror1 = "auth/email-already-in-use";
  const preerror2 = "auth/weak-password";
  const preerror3 = "auth/invalid-email";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const register = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        if (page) {
          navigate("/checkout");
        } else {
          navigate("/");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (preerror1 === errorCode) {
          seterror("User is already registered. Please try signing in!");
        } else if (preerror2 === errorCode) {
          seterror("Password should be at least 6 characters!");
        } else if (preerror3 === errorCode) {
          seterror("Enter a valid email address!");
        } else {
          seterror(errorMessage);
        }
        // ..
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="logo"
        />
      </Link>

      <div className="login__container">
        <h1>Register</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={register}
            className=" btn btn3 login__registerButton"
          >
            Create your Amazon Account
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <Link to="/login">
          <button type="submit" className="login__signInButton btn btn3">
            Sign In
          </button>
        </Link>
        <p className="error">{error}</p>
      </div>
    </div>
  );
}

export default Register;
