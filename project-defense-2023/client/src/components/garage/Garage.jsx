import { useEffect, useState } from "react";

import * as carService from "../../services/carService";
import CarItem from "./car-item/CarItem";

export default function Garage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    carService
      .getAll()
      .then((result) => setCars(result))
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div id="catalog">
      <h1>Garage</h1>

      {cars.map((car) => (
        <CarItem key={car._id} {...car} />
      ))}

      {cars.length === 0 && <h3 className="no-articles">No Cars Added</h3>}
    </div>
  );
}
