import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getNidk = () => {
  return axios
    .get("nidk/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getNidkById = (id) => {
  return axios
    .get("nidk/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postNidk = (Nidk) => {
  const body = {
    nidk: Nidk.nidk,
    id_dosen: Nidk.id_dosen,
    nama: Nidk.nama,
  };

  return axios
    .post("nidk/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putNidk = (Nidk) => {
  const body = {
    nidk: Nidk.nidk,
    id_dosen: Nidk.id_dosen,
    nama: Nidk.nama,
  };

  return axios
    .put("nidk/" + Nidk.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteNidk = (id) => {
  return axios
    .delete("nidk/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
