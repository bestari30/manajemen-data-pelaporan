import PageTitle from "../../components/PageTitle/PageTitle";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HakiTableContainer } from "./HakiTableContainer";
import { Grid, CircularProgress } from "@material-ui/core";
import { AddHaki } from "./AddHaki";
import { getDosen } from "../../functions/Dosen";
import { getProgramStudi } from "../../functions/ProgramStudi";
import { getHaki, postHaki, putHaki, deleteHaki } from "../../functions/Haki";

export default function Haki() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataDosen, setDataDosen] = useState([]);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [detailState, setDetailState] = useState({
    judul: "",
    no_hki: "",
    nama_dosen: "",
    nidn_dosen: "",
    nama_program_studi: "",
    no_pendaftaran: "",
    no_semester: "",
    tahun_ajaran: "",
  });

  const [editState, setEditState] = useState({
    id: "",
    judul: "",
    no_hki: "",
    id_dosen: "",
    id_program_studi: "",
    no_pendaftaran: "",
    semester: "",
    tahun_ajaran: "",
  });

  const [tambahState, setTambahState] = useState({
    judul: "",
    no_hki: "",
    id_dosen: "",
    id_program_studi: "",
    no_pendaftaran: "",
    semester: "",
    tahun_ajaran: "",
  });

  const [firstWriter, setFirstWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });
  useEffect(() => {
    async function getData() {
      const dataDosen = await getDosen();
      const dataProgramStudi = await getProgramStudi();
      setDataDosen(dataDosen.data);
      setDataProgramStudi(dataProgramStudi.data);

      getDataHaki();
    }
    getData();
  }, []);

  const getDataHaki = async () => {
    setIsLoading(true);
    const data = await getHaki();
    let result = [];
    data.data.forEach((x, i) => {
      const flattenData = {
        no: i + 1,
        id: x.id,
        id_dosen: x.dosen?.id,
        nama_dosen: x.dosen?.nama,
        nidn_dosen: x.dosen?.nidn,
        id_program_studi: x.program_studi?.id,
        nama_program_studi: x.program_studi?.nama,
        judul: x.judul,
        no_hki: x.no_hki,
        no_pendaftaran: x.no_pendaftaran,
        no_semester: x.semester,
        tahun_ajaran: x.tahun_ajaran,
        semester: x.tahun_ajaran + "" + x.semester,
      };
      result.push(flattenData);
    });
    setData(result);
    setIsLoading(false);
  };

  const editHaki = async () => {
    setIsLoading(true);
    const response = await putHaki(editState);
    if (response.errorMessage === null) {
      history.push(`/app/haki`);
    }
    getDataHaki();
    setIsLoading(false);
    setEditState({
      id: "",
      judul: "",
      no_hki: "",
      id_dosen: "",
      id_program_studi: "",
      no_pendaftaran: "",
      semester: "",
      tahun_ajaran: "",
    });
  };
  const insertHaki = async () => {
    setIsLoading(true);
    const response = await postHaki(tambahState);
    if (response.errorMessage === null) {
      history.push(`/app/haki`);
    }
    getDataHaki();
    setIsLoading(false);
    setTambahState({
      judul: "",
      no_hki: "",
      id_dosen: "",
      id_program_studi: "",
      no_pendaftaran: "",
      semester: "",
      tahun_ajaran: "",
    });
    setFirstWriter("");
  };

  return (
    <>
      <PageTitle
        title="HAKI"
        button={
          <AddHaki
            insertHaki={insertHaki}
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
            <HakiTableContainer
              setDetailState={setDetailState}
              detailState={detailState}
              setIsLoading={setIsLoading}
              deleteHaki={deleteHaki}
              getDataHaki={getDataHaki}
              data={data}
              editHaki={editHaki}
              setEditState={setEditState}
              editState={editState}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
