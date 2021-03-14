import PageTitle from "../../components/PageTitle/PageTitle";
import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PublikasiTableContainer } from "./PublikasiTableContainer";
import { Grid, CircularProgress } from "@material-ui/core";
import { AddPublikasi } from "./AddPublikasi";
import {
  getPublikasi,
  postPublikasi,
  putPublikasi,
  deletePublikasi,
} from "../../functions/Publikasi";

export default function Publikasi() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailState, setDetailState] = useState({
    semester: "",
    judul: "",
    nama_jurnal: "",
    edisi: "",
    volume: "",
    url: "",
    nama_program_studi: "",
    nama_tingkat: "",
    nama_dosen_1: "",
    nama_dosen_2: "",
    nama_dosen_3: "",
    jumlah_penulis: "",
    no_semester: "",
    hibah_dikti: "",
  });

  const [editState, setEditState] = useState({
    id: "",
    judul: "",
    nama_jurnal: "",
    edisi: "",
    volume: "",
    url: "",
    id_program_studi: "",
    id_tingkat: "",
    id_dosen_1: null,
    id_dosen_2: null,
    id_dosen_3: null,
    jumlah_penulis: "",
    tahun_ajaran: "",
    no_semester: "",
    hibah_dikti: "",
  });

  const [tambahState, setTambahState] = useState({
    semester: "",
    judul: "",
    nama_jurnal: "",
    edisi: "",
    volume: "",
    url: "",
    id_program_studi: "",
    id_tingkat: "",
    id_dosen_1: null,
    id_dosen_2: null,
    id_dosen_3: null,
    jumlah_penulis: "",
    tahun_ajaran: "",
    hibah_dikti: "",
  });

  const [firstWriter, setFirstWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });
  const [secondWriter, setSecondWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });

  const [thirdWriter, setThirdWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });

  useEffect(() => {
    async function getData() {
      const data = await getPublikasi();
      let result = [];
      data.data.forEach((x, i) => {
        let jumlah_penulis = 0;
        if (x.dosen_1 !== null) jumlah_penulis++;
        if (x.dosen_2 !== null) jumlah_penulis++;
        if (x.dosen_3 !== null) jumlah_penulis++;

        const flattenData = {
          no: i + 1,
          id: x.id,
          semester: x.tahun_ajaran + "" + x.semester,
          judul: x.judul,
          nama_jurnal: x.nama_jurnal,
          edisi: x.edisi,
          volume: x.volume,
          url: x.url,
          hibah_dikti: x.hibah_dikti,
          nama_program_studi: x.program_studi.nama,
          nama_tingkat: x.tingkat.nama,
          nama_dosen_1: x.dosen_1?.nama,
          nama_dosen_2: x.dosen_2?.nama,
          nama_dosen_3: x.dosen_2?.nama,
          id_program_studi: x.program_studi.id,
          id_tingkat: x.tingkat.id,
          id_dosen_1: x.dosen_1?.id,
          id_dosen_2: x.dosen_2?.id,
          id_dosen_3: x.dosen_2?.id,
          jumlah_penulis: jumlah_penulis,
          tahun_ajaran: x.tahun_ajaran,
          no_semester: x.semester,
        };
        result.push(flattenData);
      });
      setData(result);
      setIsLoading(false);
    }
    getData();
  }, []);

  const getDataPublikasi = async () => {
    const data = await getPublikasi();
    let result = [];
    data.data.forEach((x, i) => {
      let jumlah_penulis = 0;
      if (x.dosen_1 !== null) jumlah_penulis++;
      if (x.dosen_2 !== null) jumlah_penulis++;
      if (x.dosen_3 !== null) jumlah_penulis++;

      const flattenData = {
        no: i + 1,
        id: x.id,
        semester: x.tahun_ajaran + "" + x.semester,
        judul: x.judul,
        nama_jurnal: x.nama_jurnal,
        edisi: x.edisi,
        volume: x.volume,
        url: x.url,
        hibah_dikti: x.hibah_dikti,
        nama_program_studi: x.program_studi.nama,
        nama_tingkat: x.tingkat.nama,
        nama_dosen_1: x.dosen_1?.nama,
        nama_dosen_2: x.dosen_2?.nama,
        nama_dosen_3: x.dosen_2?.nama,
        id_program_studi: x.program_studi.id,
        id_tingkat: x.tingkat.id,
        id_dosen_1: x.dosen_1?.id,
        id_dosen_2: x.dosen_2?.id,
        id_dosen_3: x.dosen_2?.id,
        jumlah_penulis: jumlah_penulis,
        tahun_ajaran: x.tahun_ajaran,
        no_semester: x.semester,
      };
      result.push(flattenData);
    });
    setData(result);
    setIsLoading(false);
  };

  const editPublikasi = async () => {
    setIsLoading(true);
    const response = await putPublikasi(editState);
    if (response.errorMessage === null) {
      history.push(`/app/publikasi`);
    }
    getDataPublikasi();
    setIsLoading(false);
    setEditState({
      id: "",
      judul: "",
      nama_jurnal: "",
      edisi: "",
      volume: "",
      url: "",
      id_program_studi: "",
      id_tingkat: "",
      id_dosen_1: null,
      id_dosen_2: null,
      id_dosen_3: null,
      jumlah_penulis: "",
      tahun_ajaran: "",
      no_semester: "",
      hibah_dikti: "",
    });
  };
  const insertPublikasi = async () => {
    setIsLoading(true);
    const response = await postPublikasi(tambahState);
    if (response.errorMessage === null) {
      history.push(`/app/publikasi`);
    }
    getDataPublikasi();
    setIsLoading(false);
    setTambahState({
      semester: "",
      judul: "",
      nama_jurnal: "",
      edisi: "",
      volume: "",
      url: "",
      id_program_studi: "",
      id_tingkat: "",
      id_dosen_1: null,
      id_dosen_2: null,
      id_dosen_3: null,
      jumlah_penulis: "",
      tahun_ajaran: "",
      hibah_dikti: "",
    });
    setFirstWriter("");
    setSecondWriter("");
    setThirdWriter("");
  };

  return (
    <>
      <PageTitle
        title="Publikasi"
        button={
          <AddPublikasi
            insertPublikasi={insertPublikasi}
            setTambahState={setTambahState}
            tambahState={tambahState}
            firstWriter={firstWriter}
            setFirstWriter={setFirstWriter}
            secondWriter={secondWriter}
            setSecondWriter={setSecondWriter}
            thirdWriter={thirdWriter}
            setThirdWriter={setThirdWriter}
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
            <PublikasiTableContainer
              setDetailState={setDetailState}
              detailState={detailState}
              setIsLoading={setIsLoading}
              deletePublikasi={deletePublikasi}
              getDataPublikasi={getDataPublikasi}
              data={data}
              editPublikasi={editPublikasi}
              setEditState={setEditState}
              editState={editState}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
