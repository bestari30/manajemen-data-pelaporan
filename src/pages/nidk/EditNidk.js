import CustomModalEdit from "../../components/CustomModalEdit/CustomModalEdit";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useRef, useState } from "react";
import { getDosen } from "../../functions/Dosen";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";

export const EditNidk = ({ editNidk, tableMeta, setEditState, editState }) => {
  const [dosen, setDosen] = useState([]);

  const [firstWriter, setFirstWriter] = useState({
    id: null,
    nidn: 0,
    nama: "",
  });

  const fetchDosen = useRef(async () => {
    const { data } = await getDosen();
    setDosen(data);
  });

  const fetchAll = useRef(() => {
    fetchDosen.current();
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
        editNidk();
      }}
      handleInitialData={async () => {
        const { rowData } = tableMeta;
        setEditState({
          id: rowData[0],
          nidk: rowData[2],
          id_dosen: rowData[3],
          nama: rowData[4],
        });
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">NIDK</Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            value={editState.nidk}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Nama Dosen</Typography>
          <TextField
            variant="outlined"
            size="small"
            style={{ marginRight: "4px" }}
            fullWidth
            value={editState.nama}
            onChange={(e) => {
              setEditState((c) => ({ ...c, nama: e.target.value }));
            }}
          />
          {/* <Typography variant="caption">Nama Dosen</Typography>
          <Autocomplete
            value={firstWriter}
            onChange={(event, newValue) => {
              console.log(newValue);
              setFirstWriter(newValue);
            }}
            getOptionLabel={(option) => option.nama}
            id="add-penulis-1"
            options={dosen}
            fullWidth
            renderInput={(params) => <TextField {...params} />}
            style={{ marginBottom: "15px" }}
          /> */}
        </Grid>
      </Grid>
    </CustomModalEdit>
  );
};

export default EditNidk;
