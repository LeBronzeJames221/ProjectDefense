import * as carService from "../../services/carService.js";
import { useNavigate } from "react-router-dom";
export default function CarCreate() {
  const navigate = useNavigate();

  const createCarSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await carService.create(
        Object.fromEntries(new FormData(e.currentTarget))
      );
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
