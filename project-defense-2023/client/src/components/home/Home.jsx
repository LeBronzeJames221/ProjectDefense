import { useEffect, useState } from "react";
import * as carService from "../../services/carService";
import LatestCars from "./latest-car/LatestCars";

export default function Home() {
  const [latestCars, setLatestCars] = useState([]);

  useEffect(() => {
    carService.getLatest().then((result) => setLatestCars(result));
  }, []);

  return (
    <section id="home-page">
      <div className="intro-message">
        <h1>UNLEASH THE BEAST</h1>
        <img src="./images/logo.png" alt="logo" />
      </div>

      <div id="recent-cars">
        <h1>Recently Added</h1>

        {latestCars.map((car) => (
          <LatestCars key={car._id} {...car} />
        ))}

        {!latestCars.length && (
          <p className="no-cars-added">The Garage Is Empty</p>
        )}
      </div>
    </section>
  );
}
