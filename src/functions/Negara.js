import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getNegara = () => {
  return axios
    .get("negara/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getNegaraById = (id) => {
  return axios
    .get("negara/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const postNegara = (Negara) => {
  const body = {
    iso: Negara.iso,
    name: Negara.name,
    nicename: Negara.nicename,
    iso3: Negara.iso3,
    numcode: Negara.numcode,
    phonecode: Negara.phonecode,
  };

  return axios
    .post("negara/", body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const putNegara = (Negara) => {
  const body = {
    iso: Negara.iso,
    name: Negara.name,
    nicename: Negara.nicename,
    iso3: Negara.iso3,
    numcode: Negara.numcode,
    phonecode: Negara.phonecode,
  };

  return axios
    .put("negara/" + Negara.id, body, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteNegara = (id) => {
  return axios
    .delete("negara/" + id, axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
