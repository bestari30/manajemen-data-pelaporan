import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useRef, useState } from "react";
import { getDosen } from "../../functions/Dosen";
import { getTingkat } from "../../functions/Tingkat";
import { getProgramStudi } from "../../functions/ProgramStudi";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";

export const EditPublikasi = ({
  editPublikasi,
  tableMeta,
  setEditState,
  editState,
}) => {
  const [dosen, setDosen] = useState([]);
  const [dataTingkat, setDataTingkat] = useState([]);
  const [dataProgramStudi, setDataProgramStudi] = useState([]);

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
    const searchFirstDosen = dosen.find((element) => {
      return editState.id_dosen_1 === element.id;
    });
    const searchSecondDosen = dosen.find((element) => {
      return editState.id_dosen_2 === element.id;
    });
    const searchThirdDosen = dosen.find((element) => {
      return editState.id_dosen_3 === element.id;
    });
    if (searchFirstDosen !== undefined) {
      setFirstWriter(searchFirstDosen);
    }
    if (searchSecondDosen !== undefined) {
      setSecondWriter(searchSecondDosen);
    }
    if (searchThirdDosen !== undefined) {
      setThirdWriter(searchThirdDosen);
    }
  }, [editState.id_dosen_1, editState.id_dosen_2, editState.id_dosen_3, dosen]);

  useEffect(() => {
    fetchAll.current();
  }, []);

  useEffect(() => {
    if (firstWriter === null) {
      setEditState((c) => ({ ...c, id_dosen_1: null }));
      return;
    }
    setEditState((c) => ({ ...c, id_dosen_1: firstWriter.id }));
  }, [firstWriter, setEditState]);

  useEffect(() => {
    if (secondWriter === null) {
      setEditState((c) => ({ ...c, id_dosen_2: null }));
      return;
    }
    setEditState((c) => ({ ...c, id_dosen_2: secondWriter.id }));
  }, [secondWriter, setEditState]);

  useEffect(() => {
    if (thirdWriter === null) {
      setEditState((c) => ({ ...c, id_dosen_3: null }));
      return;
    }
    setEditState((c) => ({ ...c, id_dosen_3: thirdWriter.id }));
  }, [thirdWriter, setEditState]);

  return (
    <CustomModalEdit
      handleEdit={() => {
        editPublikasi();
      }}
      handleInitialData={async () => {
        const { rowData } = tableMeta;
        setEditState({
          id: rowData[0],
          judul: rowData[5],
          nama_jurnal: rowData[8],
          edisi: rowData[9],
          volume: rowData[10],
          url: rowData[11],
          id_program_studi: rowData[2],
          id_tingkat: rowData[6],
          id_dosen_1: rowData[13],
          nama_dosen_1: rowData[14],
          id_dosen_2: rowData[15],
          nama_dosen_2: rowData[16],
          id_dosen_3: rowData[17],
          jumlah_penulis: rowData[12],
          tahun_ajaran: rowData[19],
          no_semester: rowData[20],
          hibah_dikti: rowData[21],
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Judul</Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            value={editState.judul}
            onChange={(e) => {
              setEditState((c) => ({ ...c, judul: e.target.value }));
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption">Jurnal</Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            value={editState.nama_jurnal}
            onChange={(e) => {
              setEditState((c) => ({ ...c, nama_jurnal: e.target.value }));
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Hibah Dikti</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={editState.hibah_dikti}
            onChange={(e) => {
              setEditState((c) => ({
                ...c,
                hibah_dikti: e.target.value,
              }));
            }}
            fullWidth
            style={{ marginBottom: "3px" }}
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
            style={{ marginRight: "4px" }}
            fullWidth
            variant="outlined"
            size="small"
            value={editState.edisi}
            onChange={(e) => {
              setEditState((c) => ({ ...c, edisi: e.target.value }));
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="caption">Volume</Typography>
          <TextField
            style={{ marginRight: "4px" }}
            fullWidth
            variant="outlined"
            size="small"
            value={editState.volume}
            onChange={(e) => {
              setEditState((c) => ({ ...c, volume: e.target.value }));
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">Tingkat</Typography>
          <Select
            variant="outlined"
            margin="dense"
            value={editState.id_tingkat}
            onChange={(e) => {
              setEditState((c) => ({
                ...c,
                id_tingkat: e.target.value,
              }));
            }}
            style={{ marginBottom: "3px" }}
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
            value={editState.tahun_ajaran}
            onChange={(e) => {
              setEditState((c) => ({ ...c, tahun_ajaran: e.target.value }));
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
            style={{ marginBottom: "3px" }}
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
            value={editState.id_program_studi}
            onChange={(e) => {
              setEditState((c) => ({
                ...c,
                id_program_studi: e.target.value,
              }));
            }}
            fullWidth
            style={{ marginBottom: "3px" }}
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
            value={editState.url}
            onChange={(e) => {
              setEditState((c) => ({ ...c, url: e.target.value }));
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Penulis 1</Typography>
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
          <Typography variant="caption">Penulis 2</Typography>
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
          <Typography variant="caption">Penulis 3</Typography>
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
    </CustomModalEdit>
  );
};

export default EditPublikasi;
