import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext.jsx";

export default function Header() {
  const { isLoggedIn, username } = useContext(AuthContext);
  return (
    <div className="div-header">
      <header>
        <h1>
          <Link className="home-page" to="/">
            CarMania
          </Link>
        </h1>
        {isLoggedIn && <span>Welcome Back, {username}</span>}

        <nav>
          <Link to="/cars">Garage</Link>
          {isLoggedIn && (
            <div id="logged-in">
              <Link to="/cars/create">Create A Car</Link>
              <Link to="/logout">Logout</Link>
            </div>
          )}
          {!isLoggedIn && (
            <div id="not-logged-in">
              <Link to="/login">Sign In</Link>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
