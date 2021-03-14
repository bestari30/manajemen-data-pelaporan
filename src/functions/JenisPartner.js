import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getJenisPartner = () => {
  return axios
    .get("jenisPartner/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getJenisPartnerById = (id) => {
  return axios
    .get("jenisPartner/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postJenisPartner = (jenisPartner) => {
  const body = {
    nama: jenisPartner.nama,
  };

  return axios
    .post("jenisPartner/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putJenisPartner = (jenisPartner) => {
  const body = {
    nama: jenisPartner.nama,
  };

  return axios
    .put("jenisPartner/" + jenisPartner.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteJenisPartner = (id) => {
  return axios
    .delete("jenisPartner/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
