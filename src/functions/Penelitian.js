import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getPenelitian = () => {
  return axios
    .get("penelitian/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getPenelitianCountByProgramStudi = () => {
  return axios
    .get("penelitian/count/programStudi", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getKerjasamaById = (id) => {
  console.log(id);
  return axios
    .get("kerjasama/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postPenelitian = (penelitian) => {
  const body = penelitian;

  return axios
    .post("penelitian/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putPenelitian = (penelitian) => {
  const body = penelitian;

  return axios
    .put("penelitian/" + penelitian.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deletePenelitian = (id) => {
  return axios
    .delete("penelitian/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
