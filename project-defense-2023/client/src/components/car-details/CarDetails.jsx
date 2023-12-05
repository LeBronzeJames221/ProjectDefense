import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as carService from "../../services/carService.js";
import * as commentService from "../../services/commentService.js";
import AuthContext from "../../contexts/authContext.jsx";
import reducer from "./commentReducer.js";
import useForm from "../../hooks/useForm.js";

export default function CarDetails() {
  const navigate = useNavigate();
  const { email, userId } = useContext(AuthContext);
  const [car, setCar] = useState({});
  const { carId } = useParams();
  const [likes, setLikes] = useState([]);
  // const [comments, setComments] = useState([]);
  const [comments, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    carService.getOne(carId).then(setCar);

    commentService.getAll(carId).then((result) => {
      dispatch({
        type: "GET_ALL_COMMENTS",
        payload: result,
      });
    });
  }, [carId]);

  const addCommentHandler = async (values) => {
    const newComment = await commentService.create(carId, values.comment);
    newComment.owner = { email };

    dispatch({
      type: "ADD_COMMENT",
      payload: newComment,
    });
  };

  const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    comment: "",
  });

  const deleteButtonClickHandler = async () => {
    let isConfirmed = confirm(
      `Are you sure you want to delete the following car: ${car.brand} ${car.model}`
    );

    if (isConfirmed) {
      await carService.remove(carId);
      navigate("/cars");
    }
  };

  const likeButtonClickHandler = () => {
    setLikes((prevLikes) =>
      prevLikes.includes(carId)
        ? prevLikes.filter((id) => id !== carId)
        : [...prevLikes, carId]
    );
  };

  return (
    <div className="car-details-container">
      <div className="car-details">
        <img src={car.imageUrl} alt={car.title} />
        <h2>{car.brand}</h2>
        <h6>{car.model}</h6>
        <p>Price: {car.price} $</p>
        <p>Description: {car.description}</p>
        {userId === car._ownerId && (
          <div>
            <button
              className="button"
              onClick={() => navigate(`/cars/${carId}/edit`)}
            >
              Edit
            </button>
            <button className="button" onClick={deleteButtonClickHandler}>
              Delete
            </button>
          </div>
        )}
        <div className="del-edit-buttons">
          {userId === car._ownerId && (
            <p>You are prohibited to comment your own creations!</p>
          )}
          {userId !== car._ownerId && (
            <>
              <button className="button" onClick={likeButtonClickHandler}>
                {likes.length === 0 ? "LIKE" : "UNLIKE"}
              </button>
              {likes.length !== 0 && <span>&#x2764;</span>}
            </>
          )}

          {userId !== car._ownerId && (
            <div className="comments">
              <form className="form" onSubmit={onSubmit}>
                <textarea
                  name="comment"
                  value={values.comment}
                  onChange={onChange}
                  placeholder="Express Yourself..."
                  required
                ></textarea>
                <input className="btn" type="submit" value="Add" />
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="show-comments">
        <p>COMMENTS</p>
        {comments.map(({ _id, text, owner: { email } }) => (
          <li key={_id} className="single-comment">
            <ul>
              {email} : {text}
            </ul>
          </li>
        ))}
      </div>
    </div>
  );
}
