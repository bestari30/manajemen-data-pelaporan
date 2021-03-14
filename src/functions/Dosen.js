import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getDosen = () => {
  return axios
    .get("dosen/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getDosenById = (id) => {
  return axios
    .get("dosen/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postDosen = (dosen) => {
  const body = {
    nidn: dosen.nidn,
    nama: dosen.nama,
  };

  return axios
    .post("dosen/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putDosen = (dosen) => {
  const body = {
    nidn: dosen.nidn,
    nama: dosen.nama,
  };

  return axios
    .put("dosen/" + dosen.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteDosen = (id) => {
  return axios
    .delete("dosen/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
