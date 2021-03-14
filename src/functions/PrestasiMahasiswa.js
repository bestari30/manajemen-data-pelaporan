import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getPrestasiMahasiswa = () => {
  return axios
    .get("prestasiMahasiswa/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const countPrestasiMahasiswaKategoriByProgramStudi = () => {
  return axios
    .get("prestasiMahasiswa/count/kategori/programStudi", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getKerjasamaById = (id) => {
  console.log(id);
  return axios
    .get("kerjasama/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postPrestasiMahasiswa = (PrestasiMahasiswa) => {
  const body = PrestasiMahasiswa;

  return axios
    .post("prestasiMahasiswa/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putPrestasiMahasiswa = (PrestasiMahasiswa) => {
  const body = PrestasiMahasiswa;

  return axios
    .put("prestasiMahasiswa/" + PrestasiMahasiswa.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deletePrestasiMahasiswa = (id) => {
  return axios
    .delete("prestasiMahasiswa/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
