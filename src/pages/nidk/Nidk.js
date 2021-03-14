import PageTitle from "../../components/PageTitle/PageTitle";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NidkTableContainer } from "./NidkTableContainer";
import { Grid, CircularProgress } from "@material-ui/core";
import { AddNidk } from "./AddNidk";
import { getDosen } from "../../functions/Dosen";
import { getNidk, postNidk, putNidk, deleteNidk } from "../../functions/Nidk";

export default function Nidk() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataDosen, setDataDosen] = useState([]);
  const [editState, setEditState] = useState({
    id: "",
    nidk: "",
    id_dosen: "",
  });

  const [tambahState, setTambahState] = useState({
    nidk: "",
    id_dosen: "",
  });

  const [firstWriter, setFirstWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });
  useEffect(() => {
    async function getData() {
      const dataDosen = await getDosen();
      setDataDosen(dataDosen.data);

      getDataNidk();
    }
    getData();
  }, []);

  const getDataNidk = async () => {
    setIsLoading(true);
    const data = await getNidk();
    let result = [];
    data.data.forEach((x, i) => {
      const flattenData = {
        no: i + 1,
        id: x.id,
        nidk: x.nidk,
        id_dosen: x.dosen?.id,
        nama: x.nama,
        nama_dosen: x.dosen?.nama,
        nidn_dosen: x.dosen?.nidn,
      };
      result.push(flattenData);
    });
    setData(result);
    setIsLoading(false);
  };

  const editNidk = async () => {
    setIsLoading(true);
    const response = await putNidk(editState);
    if (response.errorMessage === null) {
      history.push(`/app/nidk`);
    }
    getDataNidk();
    setIsLoading(false);
    setEditState({
      id: "",
      nidk: "",
      id_dosen: "",
      nama: "",
    });
  };
  const insertNidk = async () => {
    setIsLoading(true);
    const response = await postNidk(tambahState);
    if (response.errorMessage === null) {
      history.push(`/app/nidk`);
    }
    getDataNidk();
    setIsLoading(false);
    setTambahState({
      nidk: "",
      id_dosen: "",
      nama: "",
    });
    setFirstWriter("");
  };

  return (
    <>
      <PageTitle
        title="NIDK"
        button={
          <AddNidk
            insertNidk={insertNidk}
            setTambahState={setTambahState}
            tambahState={tambahState}
            firstWriter={firstWriter}
            setFirstWriter={setFirstWriter}
          />
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={50} style={{ marginTop: 50 }} />
            </div>
          ) : (
            <NidkTableContainer
              setIsLoading={setIsLoading}
              deleteNidk={deleteNidk}
              getDataNidk={getDataNidk}
              data={data}
              editNidk={editNidk}
              setEditState={setEditState}
              editState={editState}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
