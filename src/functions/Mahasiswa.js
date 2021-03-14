import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getMahasiswa = () => {
  return axios
    .get("mahasiswa/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getMahasiswaById = (id) => {
  return axios
    .get("mahasiswa/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postMahasiswa = (Mahasiswa) => {
  const body = {
    nim: Mahasiswa.nim,
    nama: Mahasiswa.nama,
  };

  return axios
    .post("mahasiswa/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putMahasiswa = (Mahasiswa) => {
  const body = {
    nim: Mahasiswa.nim,
    nama: Mahasiswa.nama,
  };

  return axios
    .put("mahasiswa/" + Mahasiswa.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteMahasiswa = (id) => {
  return axios
    .delete("mahasiswa/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
