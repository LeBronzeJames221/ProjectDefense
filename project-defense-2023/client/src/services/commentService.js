import * as request from "../lib/request.js";

const baseUrl = "http://localhost:3030/data/comments";

export const getAll = async (carId) => {
  const query = new URLSearchParams({
    where: `carId="${carId}"`,
    load: "owner=_ownerId:users",
  });
  const result = await request.get(`${baseUrl}?${query}`);

  return result;
};

export const create = async (carId, text) => {
  const newComment = await request.post(baseUrl, {
    carId,
    text,
  });

  return newComment;
};

export const remove = async (commentId) => {
  const response = await request.remove(`${baseUrl}/${commentId}`);

  return response;
};
