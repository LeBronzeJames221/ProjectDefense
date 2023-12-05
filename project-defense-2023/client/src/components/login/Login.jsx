import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext.jsx";

export default function Login() {
  const { loginSubmitHandler } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
    email: "",
    password: "",
  });
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form id="login" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={onChange}
          value={values.email}
          required
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
          value={values.password}
          required
        ></input>

        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Not registered yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
