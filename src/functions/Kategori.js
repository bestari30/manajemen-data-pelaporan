import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getKategori = () => {
  return axios
    .get("kategori/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getKategoriById = (id) => {
  return axios
    .get("kategori/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postKategori = (Kategori) => {
  const body = {
    nama: Kategori.nama,
  };

  return axios
    .post("kategori/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putKategori = (Kategori) => {
  const body = {
    nama: Kategori.nama,
  };

  return axios
    .put("kategori/" + Kategori.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteKategori = (id) => {
  return axios
    .delete("kategori/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
