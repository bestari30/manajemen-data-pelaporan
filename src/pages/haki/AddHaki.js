import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import { useState, useEffect, useRef } from "react";
import { getDosen } from "../../functions/Dosen";
import { getProgramStudi } from "../../functions/ProgramStudi";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";

export const AddHaki = ({
  insertHaki,
  setTambahState,
  tambahState,
  firstWriter,
  setFirstWriter,
}) => {
  const [dosen, setDosen] = useState([]);
  const [programStudi, setProgramStudi] = useState([]);

  const fetchDosen = useRef(async () => {
    const { data } = await getDosen();
    setDosen(data);
  });

  const fetchProgramStudi = useRef(async () => {
    const { data } = await getProgramStudi();
    setProgramStudi(data);
  });

  const fetchAll = useRef(() => {
    fetchDosen.current();
    fetchProgramStudi.current();
  });

  useEffect(() => {
    fetchAll.current();
  }, []);

  useEffect(() => {
    //   console.log(firstWriter);
    if (firstWriter === null) {
      setTambahState((c) => ({ ...c, id_dosen: null }));
      return;
    }
    setTambahState((c) => ({ ...c, id_dosen: firstWriter.id }));
  }, [firstWriter, setTambahState]);

  return (
    <CustomModalTambah
      handleTambah={() => {
        console.log(tambahState);
        insertHaki();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        <Grid item xs={3}>
          <Typography variant="caption">Nomor Haki</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setTambahState((c) => ({ ...c, no_hki: e.target.value }));
            }}
            value={tambahState.no_hki}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Nomor Pendaftaran</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setTambahState((c) => ({ ...c, no_pendaftaran: e.target.value }));
            }}
            value={tambahState.no_pendaftaran}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
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
            {programStudi.map((x) => (
              <MenuItem value={x.id} key={x.id}>
                {x.nama}
              </MenuItem>
            ))}
          </Select>
        </Grid>
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
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Nama Dosen</Typography>
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
            style={{ marginBottom: "15px" }}
          />
        </Grid>
      </Grid>
    </CustomModalTambah>
  );
};
