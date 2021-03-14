import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getBentukKegiatan = () => {
  return axios
    .get("bentukKegiatan/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getBentukKegiatanById = (id) => {
  return axios
    .get("bentukKegiatan/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postBentukKegiatan = (BentukKegiatan) => {
  const body = {
    nama: BentukKegiatan.nama,
  };

  return axios
    .post("bentukKegiatan/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putBentukKegiatan = (BentukKegiatan) => {
  const body = {
    nama: BentukKegiatan.nama,
  };

  return axios
    .put("bentukKegiatan/" + BentukKegiatan.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteBentukKegiatan = (id) => {
  return axios
    .delete("bentukKegiatan/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
