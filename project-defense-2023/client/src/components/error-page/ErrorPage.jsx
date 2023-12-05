import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div class="error-container">
      <h1>404 - Not Found</h1>
      <p>Oops! The page you are looking for might be in another galaxy.</p>
      <p className="error-link">
        <Link to="/">Return To Home Page</Link>
      </p>
    </div>
  );
}
