import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getTingkat = () => {
  return axios
    .get("tingkat/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getTingkatById = (id) => {
  return axios
    .get("tingkat/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postTingkat = (Tingkat) => {
  const body = {
    nama: Tingkat.nama,
  };

  return axios
    .post("tingkat/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putTingkat = (Tingkat) => {
  const body = {
    nama: Tingkat.nama,
  };

  return axios
    .put("tingkat/" + Tingkat.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteTingkat = (id) => {
  return axios
    .delete("tingkat/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
