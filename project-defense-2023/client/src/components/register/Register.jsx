import { useContext } from "react";

import AuthContext from "../../contexts/authContext.jsx";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";

const RegisterFormKeys = {
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirm-password",
};

export default function Register() {
  const { registerSubmitHandler } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    email: "",
    password: "",
    confirmPass: "",
  });

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form id="register" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={onChange}
          values={values.email}
          required
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChange}
          values={values.password}
          required
        ></input>

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={onChange}
          values={values.confirmPass}
          required
        ></input>

        <button type="submit">Register</button>
      </form>

      <p className="login-link">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
