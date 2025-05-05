import { createContext, useContext, useEffect, useState } from "react";


import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
 
} from "firebase/auth";
import app from "../firebase/firebase.config";


// logout
import { signOut } from "firebase/auth";



const AuthContext = createContext();
const auth = getAuth(app); // ✅ use only once

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register user
  const registerUser = (email, password) => {
    setLoading(true);
    setError(null);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  // Google sign-in
  const signInWithGoogle = () => {
    setLoading(true);
    setError(null);
    return signInWithPopup(auth, googleProvider)
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setLoading(false));
  };

 

  // Login user
  const signInUser = (email, password) => {
    setLoading(true);
    setError(null);
    return signInWithEmailAndPassword(auth, email, password)
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .catch((err) => {
        setError(err.message);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  const value = {
    user,
    loading,
    error,
    loggedIn: !!user,
    registerUser,
    signInUser,
    signInWithGoogle,
    
    logOut, // ✅ include in context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;