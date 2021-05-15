import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

function logout() {
  return auth.signOut();
}

function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

function updateEmail(email, currentUser) {
  return currentUser.updateEmail(email);
}

function updatePassword(password, currentUser) {
  return currentUser.updatePassword(password);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
