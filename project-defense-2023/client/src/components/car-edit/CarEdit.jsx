import { useNavigate, useParams } from "react-router-dom";

import * as carService from "../../services/carService";
import { useEffect, useState } from "react";

export default function CarEdit() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const [car, setCar] = useState({
    brand: "",
    model: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  const editSubmitHandler = async (e) => {
    e.preventDefault();

    const values = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await carService.edit(carId, values);

      navigate(`/cars/${car._id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const onChange = (e) => {
    setCar((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    carService.getOne(carId).then((result) => {
      setCar(result);
    });
  }, [carId]);

  return (
    <section id="edit-page" className="ed">
      <div className="title">
        <p>Edit Car Info</p>
      </div>
      <form id="carForm-edit" onSubmit={editSubmitHandler}>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={car.brand}
          onChange={onChange}
          required
        ></input>

        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          value={car.model}
          onChange={onChange}
          required
        ></input>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          min="1"
          value={car.price}
          onChange={onChange}
          required
        ></input>

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={car.imageUrl}
          onChange={onChange}
          required
        ></input>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={car.description}
          onChange={onChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
