import { Link } from "react-router-dom";

export default function CarItem({ _id, brand, model, imageUrl }) {
  return (
    <div className="car">
      <div className="car-details">
        <img src={imageUrl} />
        <h2>{brand}</h2>
        <h6>{model}</h6>
        <Link to={`/cars/${_id}`} className="details-button">
          More Details
        </Link>
      </div>
    </div>
  );
}
