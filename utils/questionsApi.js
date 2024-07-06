import axios from "axios";

const openTdb_url = axios.create({
  baseURL: "https://opentdb.com",
});

export const getCategories = (params = {}) => {
  return openTdb_url
    .get("/api_category.php", { params })
    .then(({ data }) => {
      //console.log("data :>> ", data);
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getQuestions = (topic_id) => {
  //console.log(params);
  return openTdb_url
    .get(
      `/api.php?amount=10&category=${topic_id}&difficulty=medium&type=multiple`
    )
    .then((results) => {
      // console.log("data :>> ", results);
      return results;
    })
    .catch((err) => {
      throw err;
    });
};
