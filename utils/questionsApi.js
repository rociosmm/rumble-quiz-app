import axios from "axios";

const questions_url = axios.create({
  baseURL: "https://opentdb.com",
});

export const getCategories = (params = {}) => {
  return questions_url
    .get("/api_category.php", { params })
    .then(({ data }) => {
      console.log("data :>> ", data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
