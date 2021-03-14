import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { getProgramStudi } from "../../functions/ProgramStudi";
import { getDosen } from "../../functions/Dosen";
import { getTingkat } from "../../functions/Tingkat";

import { postPublikasi } from "../../functions/Publikasi";

export default function TambahPublikasi() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const [programStudi, setProgramStudi] = useState("");
  const [tahunAjaran, setTahunAjaran] = useState("");
  const [semester, setSemester] = useState("");
  const [judul, setJudul] = useState("");
  const [hibahDikti, setHibahDikti] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [jurnal, setJurnal] = useState("");
  const [edisi, setEdisi] = useState("");
  const [volume, setVolume] = useState("");
  const [url, setURL] = useState("");
  const [penulis1, setPenulis1] = useState("");
  const [inputPenulis1, setInputPenulis1] = useState("");

  const [penulis2, setPenulis2] = useState("");
  const [inputPenulis2, setInputPenulis2] = useState("");

  const [penulis3, setPenulis3] = useState("");
  const [inputPenulis3, setInputPenulis3] = useState("");

  const [dataProgramStudi, setDataProgramStudi] = useState([]);
  const [dataTingkat, setDataTingkat] = useState([]);
  const [dataDosen, setDataDosen] = useState([]);

  useEffect(() => {
    async function getData() {
      const dataProgramStudi = await getProgramStudi();
      const dataDosen = await getDosen();
      const dataTingkat = await getTingkat();
      setDataProgramStudi(dataProgramStudi.data);
      setDataDosen(dataDosen.data);
      setDataTingkat(dataTingkat.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const insertPublikasi = async () => {
    const data = {
      judul: judul,
      id_program_studi: programStudi,
      tahun_ajaran: tahunAjaran,
      semester: semester,
      hibah_dikti: hibahDikti,
      id_tingkat: tingkat,
      nama_jurnal: jurnal,
      edisi: edisi,
      volume: volume,
      url: url,
      id_dosen_1: penulis1?.id ? penulis1?.id : null,
      id_dosen_2: penulis2?.id ? penulis2?.id : null,
      id_dosen_3: penulis3?.id ? penulis3?.id : null,
    };
    console.log(data);
    const response = await postPublikasi(data);

    if (response.errorMessage === null) {
      history.push(`/app/publikasi`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Publikasi"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/publikasi"
            margin="normal"
          >
            Kembali
          </Button>
        }
      />

      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={50} style={{ marginTop: 50 }} />
        </div>
      ) : (
        <>
          <Grid container spacing={4} style={{ backgroundColor: "white" }}>
            <Grid item xs={6}>
              <InputLabel>Judul</InputLabel>
              <TextField
                id="judul"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Program Studi</InputLabel>
              <Select
                value={programStudi}
                onChange={(e) => setProgramStudi(e.target.value)}
                fullWidth
              >
                {dataProgramStudi.map((x) => (
                  <MenuItem value={x.id}>{x.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Tahun Ajaran</InputLabel>
              <TextField
                id="tahunAjaran"
                value={tahunAjaran}
                onChange={(e) => setTahunAjaran(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                fullWidth
              >
                <MenuItem value={1}>Ganjil</MenuItem>
                <MenuItem value={2}>Genap</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Hibah Dikti</InputLabel>
              <Select
                value={hibahDikti}
                onChange={(e) => setHibahDikti(e.target.value)}
                fullWidth
              >
                <MenuItem value="Ya">Ya</MenuItem>
                <MenuItem value="Tidak">Tidak</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Tingkat</InputLabel>
              <Select
                value={tingkat}
                onChange={(e) => setTingkat(e.target.value)}
                fullWidth
              >
                {dataTingkat.map((x) => (
                  <MenuItem value={x.id}>{x.nama}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Nama Jurnal</InputLabel>
              <TextField
                id="jurnal"
                value={jurnal}
                onChange={(e) => setJurnal(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Edisi</InputLabel>
              <TextField
                id="edisi"
                value={edisi}
                onChange={(e) => setEdisi(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Volume</InputLabel>
              <TextField
                id="volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>URL</InputLabel>
              <TextField
                id="url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Penulis 1</InputLabel>
              <Autocomplete
                value={penulis1}
                onChange={(event, newValue) => {
                  setPenulis1(newValue);
                }}
                inputValue={inputPenulis1}
                onInputChange={(event, newInputValue) => {
                  setInputPenulis1(newInputValue);
                }}
                options={dataDosen}
                getOptionLabel={(option) => option.nama}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
                freeSolo
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Penulis 2</InputLabel>
              <Autocomplete
                value={penulis2}
                onChange={(event, newValue) => {
                  setPenulis2(newValue);
                }}
                inputValue={inputPenulis2}
                onInputChange={(event, newInputValue) => {
                  setInputPenulis2(newInputValue);
                }}
                options={dataDosen}
                getOptionLabel={(option) => option.nama}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
                freeSolo
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Penulis 3</InputLabel>
              <Autocomplete
                value={penulis3}
                onChange={(event, newValue) => {
                  setPenulis3(newValue);
                }}
                inputValue={inputPenulis3}
                onInputChange={(event, newInputValue) => {
                  setInputPenulis3(newInputValue);
                }}
                options={dataDosen}
                getOptionLabel={(option) => option.nama}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
                freeSolo
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={6}
            style={{ padding: "20px", backgroundColor: "white" }}
          >
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                // href="#/app/kerjasama"
                margin="normal"
                onClick={insertPublikasi}
              >
                Simpan
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
