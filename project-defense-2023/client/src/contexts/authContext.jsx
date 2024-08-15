import { createContext } from "react";
import * as authService from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import usePersistedState from "../hooks/usePersistedState.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState("auth", {});

  const loginSubmitHandler = async (values) => {
    try {
      const result = await authService.login(values.email, values.password);

      setAuth(result);
      localStorage.setItem("accessToken", result.accessToken);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const registerSubmitHandler = async (values) => {
    try {
      const result = await authService.register(values.email, values.password);

      setAuth(result);
      localStorage.setItem("accessToken", result.accessToken);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const logoutHandler = () => {
    try {
      setAuth({});
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (err) {
      alert(err.meesage);
    }
  };

  const usernameMaker = () => {
    if (auth.email) {
      const splittedUsername = auth.email.split("@");
      return splittedUsername[0].toUpperCase();
    }
    return auth.email;
  };

  const values = {
    isLoggedIn: !!auth.accessToken,
    username: usernameMaker(),
    email: auth.email,
    userId: auth._id,
    loginSubmitHandler,
    logoutHandler,
    registerSubmitHandler,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
