import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getStudiLanjut = () => {
  return axios
    .get("studiLanjut/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const countStudiLanjutByProgramStudi = () => {
  return axios
    .get("studiLanjut/count/programStudi", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postStudiLanjut = (StudiLanjut) => {
  const body = StudiLanjut;

  return axios
    .post("studiLanjut/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putStudiLanjut = (StudiLanjut) => {
  const body = StudiLanjut;

  return axios
    .put("studiLanjut/" + StudiLanjut.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteStudiLanjut = (id) => {
  return axios
    .delete("studiLanjut/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
