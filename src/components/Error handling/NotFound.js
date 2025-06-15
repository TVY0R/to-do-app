import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-back">Back to Home</Link>
    </div>
  );
}
