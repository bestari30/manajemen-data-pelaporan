import axios from "axios";

axios.defaults.baseURL = "https://tehe-api.herokuapp.com/";

export let axiosConfig = {
  headers: {
    Authorization: localStorage.usertoken,
  },
};

export const getProgramStudi = () => {
  return axios
    .get("programStudi/", axiosConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const postProgramStudi = (programStudi) => {
//   const body = {
//     name: programStudi.name,
//     price: programStudi.price,
//     status: 0,
//     date: programStudi.date,
//   };

//   return axios
//     .post("programStudi/", body, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

// export const putProgramStudi = (programStudi) => {
//   const body = {
//     name: programStudi.name,
//     price: programStudi.price,
//     status: programStudi.status,
//     date: programStudi.date,
//   };

//   return axios
//     .put("programStudi/" + programStudi.id, body, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

// export const deleteProgramStudi = (programStudi) => {
//   return axios
//     .delete("programStudi/" + programStudi.id, axiosConfig)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };
