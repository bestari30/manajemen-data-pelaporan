import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getHaki = () => {
  return axios
    .get("haki/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const countHakiByProgramStudi = () => {
  return axios
    .get("haki/count/programStudi", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getHakiById = (id) => {
  return axios
    .get("haki/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postHaki = (Haki) => {
  const body = {
    judul: Haki.judul,
    no_pendaftaran: Haki.no_pendaftaran,
    no_hki: Haki.no_hki,
    tahun_ajaran: Haki.tahun_ajaran,
    semester: Haki.semester,
    id_program_studi: Haki.id_program_studi,
    id_dosen: Haki.id_dosen,
  };

  return axios
    .post("haki/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putHaki = (Haki) => {
  const body = {
    judul: Haki.judul,
    no_pendaftaran: Haki.no_pendaftaran,
    no_hki: Haki.no_hki,
    tahun_ajaran: Haki.tahun_ajaran,
    semester: Haki.semester,
    id_program_studi: Haki.id_program_studi,
    id_dosen: Haki.id_dosen,
  };

  return axios
    .put("haki/" + Haki.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteHaki = (id) => {
  return axios
    .delete("haki/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
