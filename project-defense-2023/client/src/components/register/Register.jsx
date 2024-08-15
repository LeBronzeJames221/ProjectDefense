import { useContext, useState } from "react";

import AuthContext from "../../contexts/authContext.jsx";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";

export default function Register() {
  const { registerSubmitHandler } = useContext(AuthContext);
  const { values, onChange, onSubmit } = useForm(handleSubmit, {
    email: "",
    password: "",
    confirmPass: "",
  });
  const [error, setError] = useState("");
  function handleSubmit() {
    if (values.password == values.confirmPass) {
      registerSubmitHandler(values);
    } else {
      setError(`Passwords don't match`);
    }
  }

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
          minLength={5}
        ></input>

        <label htmlFor="confirmPass">Confirm Password:</label>
        <input
          type="password"
          id="confirmPass"
          name="confirmPass"
          onChange={onChange}
          values={values.confirmPass}
          required
        ></input>
        <span>{error}</span>
        <button type="submit">Register</button>
      </form>

      <p className="login-link">
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
