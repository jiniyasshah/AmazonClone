// firebase.js
import { auth } from "./Firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Assuming you have imported the necessary Firebase modules

export function useUser() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;

        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        setUser(null);
        // ...
        console.log("user is logged out");
      }
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  return user;
}
