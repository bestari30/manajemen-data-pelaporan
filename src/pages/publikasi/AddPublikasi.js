import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import { useState, useEffect, useRef } from "react";
import { getDosen } from "../../functions/Dosen";
import { getTingkat } from "../../functions/Tingkat";
import { getProgramStudi } from "../../functions/ProgramStudi";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";

export const AddPublikasi = ({
  insertPublikasi,
  setTambahState,
  tambahState,
  firstWriter,
  setFirstWriter,
  secondWriter,
  setSecondWriter,
  thirdWriter,
  setThirdWriter,
}) => {
  const [dosen, setDosen] = useState([]);
  const [dataTingkat, setDataTingkat] = useState([]);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);

  const fetchDosen = useRef(async () => {
    const { data } = await getDosen();
    setDosen(data);
  });

  const fetchTingkat = useRef(async () => {
    const { data } = await getTingkat();
    setDataTingkat(data);
  });

  const fetchProgramStudi = useRef(async () => {
    const { data } = await getProgramStudi();
    setDataProgramStudi(data);
  });

  const fetchAll = useRef(() => {
    fetchDosen.current();
    fetchTingkat.current();
    fetchProgramStudi.current();
  });

  useEffect(() => {
    fetchAll.current();
  }, []);

  useEffect(() => {
    if (firstWriter === null) {
      setTambahState((c) => ({ ...c, id_dosen_1: null }));
      return;
    }
    setTambahState((c) => ({ ...c, id_dosen_1: firstWriter.id }));
  }, [firstWriter, setTambahState]);

  useEffect(() => {
    if (secondWriter === null) {
      setTambahState((c) => ({ ...c, id_dosen_2: null }));
      return;
    }
    setTambahState((c) => ({ ...c, id_dosen_2: secondWriter.id }));
  }, [secondWriter, setTambahState]);

  useEffect(() => {
    if (thirdWriter === null) {
      setTambahState((c) => ({ ...c, id_dosen_3: null }));
      return;
    }
    setTambahState((c) => ({ ...c, id_dosen_3: thirdWriter.id }));
  }, [thirdWriter, setTambahState]);

  return (
    <CustomModalTambah
      handleTambah={() => {
        insertPublikasi();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Judul</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setTambahState((c) => ({ ...c, judul: e.target.value }));
            }}
            value={tambahState.judul}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Jurnal</Typography>
          <TextField
            style={{ marginRight: "4px" }}
            fullWidth
            variant="outlined"
            size="small"
            value={tambahState.nama_jurnal}
            onChange={(e) => {
              setTambahState((c) => ({
                ...c,
                nama_jurnal: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Hibah Dikti</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={tambahState.hibah_dikti}
            onChange={(e) => {
              setTambahState((c) => ({
                ...c,
                hibah_dikti: e.target.value,
              }));
            }}
            fullWidth
          >
            <MenuItem value="Ya">Ya</MenuItem>
            <MenuItem value="Tidak">Tidak</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="caption">Edisi</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            onChange={(e) => {
              setTambahState((c) => ({ ...c, edisi: e.target.value }));
            }}
            value={tambahState.edisi}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Volume</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            onChange={(e) => {
              setTambahState((c) => ({ ...c, volume: e.target.value }));
            }}
            value={tambahState.volume}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Tingkat</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={tambahState.id_tingkat}
            onChange={(e) => {
              setTambahState((c) => ({
                ...c,
                id_tingkat: e.target.value,
              }));
            }}
            fullWidth
          >
            {dataTingkat.map((x) => (
              <MenuItem value={x.id} key={x.id}>
                {x.nama}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="caption">Tahun Ajaran</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={tambahState.tahun_ajaran}
            onChange={(e) => {
              setTambahState((c) => ({
                ...c,
                tahun_ajaran: e.target.value,
              }));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Semester</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={tambahState.semester}
            onChange={(e) => {
              setTambahState((c) => ({
                ...c,
                semester: e.target.value,
              }));
            }}
            fullWidth
          >
            <MenuItem value={1}>Ganjil</MenuItem>
            <MenuItem value={2}>Genap</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Program Studi</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={tambahState.id_program_studi}
            onChange={(e) => {
              setTambahState((c) => ({
                ...c,
                id_program_studi: e.target.value,
              }));
            }}
            fullWidth
          >
            {dataProgramStudi.map((x) => (
              <MenuItem value={x.id} key={x.id}>
                {x.nama}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">URL</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            onChange={(e) => {
              setTambahState((c) => ({ ...c, url: e.target.value }));
            }}
            value={tambahState.url}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Nama Penulis 1</Typography>
          <Autocomplete
            value={firstWriter}
            onChange={(event, newValue) => {
              setFirstWriter(newValue);
            }}
            getOptionLabel={(option) => option.nama}
            id="add-penulis-1"
            options={dosen}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Nama Penulis 2</Typography>
          <Autocomplete
            value={secondWriter}
            onChange={(event, newValue) => {
              setSecondWriter(newValue);
            }}
            getOptionLabel={(option) => option.nama}
            id="add-penulis-2"
            options={dosen}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Nama Penulis 3</Typography>
          <Autocomplete
            value={thirdWriter}
            onChange={(event, newValue) => {
              setThirdWriter(newValue);
            }}
            getOptionLabel={(option) => option.nama}
            id="add-penulis-3"
            options={dosen}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
            style={{ marginBottom: "13px" }}
          />
        </Grid>
      </Grid>
    </CustomModalTambah>
  );
};
