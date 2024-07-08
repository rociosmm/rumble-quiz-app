import axios from "axios";

const rumbleQuizApi = axios.create({
  baseURL: "https://rumble-quiz-server.onrender.com/api",
});

export const getUserByUsername = (userLogged) => {
  console.log(userLogged, "<<<userLogged");
  return rumbleQuizApi.get(`/users/${userLogged}`).then(({ data }) => {
    return data;
  });
};

export const patchUserByUsername = (userLogged, patchBody) => {
  return rumbleQuizApi
    .patch(`/users/${userLogged}`, patchBody)
    .then(({ data }) => {
      return data;
    });
};

export const postUserLogin = (postBody) => {
  return rumbleQuizApi
    .post(`/users/login`, postBody)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getAvatars = () => {
  return rumbleQuizApi
    .get("/avatars")
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

export const getAvatar = (id) => {
  return rumbleQuizApi.get(`/avatars/${id}`).then(({data}) => {
    console.log("data avatar :>> ", data);
    return data
  });
};

export const getUserStats = (userLogged) => {
  return rumbleQuizApi
    .get(`/users/${userLogged}/logs`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
