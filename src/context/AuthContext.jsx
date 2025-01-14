import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Tambahkan fungsi getInitialState
const getInitialState = () => {
  try {
    const savedUser = localStorage.getItem("user");
    return {
      currentUser: savedUser ? JSON.parse(savedUser) : null,
    };
  } catch {
    return { currentUser: null };
  }
};

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, getInitialState());

  useEffect(() => {
    if (state.currentUser) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};