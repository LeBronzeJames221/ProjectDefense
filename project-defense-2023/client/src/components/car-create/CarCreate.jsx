import * as carService from "../../services/carService.js";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext.jsx";
import { useContext } from "react";

export default function CarCreate() {
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();

  const createCarSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData);

    carData.creatorEmail = email.split("@")[0].toUpperCase();
    try {
      await carService.create(carData);
      navigate("/cars");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <section id="create-page" className="cr">
      <div className="title">
        <p>Create Your Own Car</p>
      </div>
      <form id="carForm" onSubmit={createCarSubmitHandler}>
        <label htmlFor="brand">Brand:</label>
        <input type="text" id="brand" name="brand" required></input>

        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" required></input>

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" min="1" required></input>

        <label htmlFor="image">Image URL:</label>
        <input type="text" id="imageUrl" name="imageUrl" required></input>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
