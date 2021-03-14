import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useRef, useState } from "react";
import { getDosen } from "../../functions/Dosen";
import { getProgramStudi } from "../../functions/ProgramStudi";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";

export const EditHaki = ({ editHaki, tableMeta, setEditState, editState }) => {
  const [dosen, setDosen] = useState([]);
  const [programStudi, setProgramStudi] = useState([]);

  const [firstWriter, setFirstWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });

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
    const searchFirstDosen = dosen.find((element) => {
      return editState.id_dosen === element.id;
    });
    if (searchFirstDosen !== undefined) {
      setFirstWriter(searchFirstDosen);
    }
  }, [editState.id_dosen, dosen]);

  useEffect(() => {
    fetchAll.current();
  }, []);

  useEffect(() => {
    if (firstWriter === null) {
      setEditState((c) => ({ ...c, id_dosen: null }));
      return;
    }
    setEditState((c) => ({ ...c, id_dosen: firstWriter.id }));
  }, [firstWriter, setEditState]);

  return (
    <CustomModalEdit
      handleEdit={() => {
        editHaki();
      }}
      handleInitialData={async () => {
        const { rowData } = tableMeta;
        setEditState({
          id: rowData[0],
          judul: rowData[2],
          no_pendaftaran: rowData[3],
          no_hki: rowData[4],
          tahun_ajaran: rowData[5],
          no_semester: rowData[6],
          id_program_studi: rowData[8],
          id_dosen: rowData[10],
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Judul</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setEditState((c) => ({ ...c, judul: e.target.value }));
            }}
            value={editState.judul}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Nomor Haki</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setEditState((c) => ({ ...c, no_hki: e.target.value }));
            }}
            value={editState.no_hki}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Nomor Pendaftaran</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setEditState((c) => ({ ...c, no_pendaftaran: e.target.value }));
            }}
            value={editState.no_pendaftaran}
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
            value={editState.id_program_studi}
            onChange={(e) => {
              setEditState((c) => ({
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
            value={editState.tahun_ajaran}
            onChange={(e) => {
              setEditState((c) => ({
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
            value={editState.no_semester}
            onChange={(e) => {
              setEditState((c) => ({
                ...c,
                no_semester: e.target.value,
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
    </CustomModalEdit>
  );
};

export default EditHaki;
