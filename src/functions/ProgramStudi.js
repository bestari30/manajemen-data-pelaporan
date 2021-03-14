import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getProgramStudi = () => {
  return axios
    .get("programStudi/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getProgramStudiById = (id) => {
  return axios
    .get("programStudi/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postProgramStudi = (programStudi) => {
  const body = {
    nama: programStudi.nama,
  };

  return axios
    .post("programStudi/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putProgramStudi = (programStudi) => {
  const body = {
    nama: programStudi.nama,
  };

  return axios
    .put("programStudi/" + programStudi.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteProgramStudi = (id) => {
  return axios
    .delete("programStudi/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
