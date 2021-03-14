import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getPengabdianMasyarakat = () => {
  return axios
    .get("pengabdianMasyarakat/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getPengabdianMasyarakatCountByProgramStudi = () => {
  return axios
    .get("pengabdianMasyarakat/count/programStudi", axiosConfig)
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

export const postPengabdianMasyarakat = (pengabdianMasyarakat) => {
  const body = pengabdianMasyarakat;

  return axios
    .post("pengabdianMasyarakat/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putPengabdianMasyarakat = (pengabdianMasyarakat) => {
  const body = pengabdianMasyarakat;

  return axios
    .put("pengabdianMasyarakat/" + pengabdianMasyarakat.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deletePengabdianMasyarakat = (id) => {
  return axios
    .delete("pengabdianMasyarakat/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
