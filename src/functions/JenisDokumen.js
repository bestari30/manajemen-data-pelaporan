import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getJenisDokumen = () => {
  return axios
    .get("jenisDokumen/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getJenisDokumenById = (id) => {
  return axios
    .get("jenisDokumen/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postJenisDokumen = (jenisDokumen) => {
  const body = {
    nama: jenisDokumen.nama,
  };

  return axios
    .post("jenisDokumen/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putJenisDokumen = (jenisDokumen) => {
  const body = {
    nama: jenisDokumen.nama,
  };

  return axios
    .put("jenisDokumen/" + jenisDokumen.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteJenisDokumen = (id) => {
  return axios
    .delete("jenisDokumen/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
