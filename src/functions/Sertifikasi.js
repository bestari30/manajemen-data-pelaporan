import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getSertifikasi = () => {
  return axios
    .get("sertifikasi/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const countSertifikasiByProgramStudi = () => {
  return axios
    .get("sertifikasi/count/programStudi", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postSertifikasi = (Sertifikasi) => {
  const body = Sertifikasi;

  return axios
    .post("sertifikasi/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putSertifikasi = (Sertifikasi) => {
  const body = Sertifikasi;

  return axios
    .put("sertifikasi/" + Sertifikasi.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteSertifikasi = (id) => {
  return axios
    .delete("sertifikasi/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
