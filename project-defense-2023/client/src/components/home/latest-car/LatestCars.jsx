import { Link } from "react-router-dom";

export default function LatestCars({ _id, imageUrl, brand }) {
  return (
    <div className="item">
      <img src={imageUrl} />
      <h3>{brand}</h3>
      <Link to={`/cars/${_id}`} className="detail-button">
        Details
      </Link>
    </div>
  );
}
