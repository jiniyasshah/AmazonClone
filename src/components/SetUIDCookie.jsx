import React, { useEffect } from "react";

const SetUIDCookie = ({ uid }) => {
  useEffect(() => {
    // Function to set a cookie with the UID
    const setCookie = (name, value, days) => {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + days);
      const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
      )}; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = cookieValue;
    };

    // Call the setCookie function to set the UID cookie
    setCookie("uid", uid, 30); // Change 30 to the number of days you want the cookie to persist

    // You can add additional logic here if needed
  }, [uid]);

  return <div>UID Cookie set!</div>;
};

export default SetUIDCookie;
