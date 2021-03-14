import CustomModalTambah from "../../components/CustomModalTambah/CustomModalTambah";
import { useState, useEffect, useRef } from "react";
import { getDosen } from "../../functions/Dosen";
import { Autocomplete } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField, Select, MenuItem } from "@material-ui/core";

export const AddNidk = ({
  insertNidk,
  setTambahState,
  tambahState,
  firstWriter,
  setFirstWriter,
}) => {
  const [dosen, setDosen] = useState([]);

  const fetchDosen = useRef(async () => {
    const { data } = await getDosen();
    setDosen(data);
  });

  const fetchAll = useRef(() => {
    fetchDosen.current();
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
        insertNidk();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">NIDK</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setTambahState((c) => ({ ...c, nidk: e.target.value }));
            }}
            value={tambahState.nidk}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="caption">Nama Dosen</Typography>
          <TextField
            fullWidth
            onChange={(e) => {
              setTambahState((c) => ({ ...c, nama: e.target.value }));
            }}
            value={tambahState.nama}
            variant="outlined"
            size="small"
          />
          {/* <Typography variant="caption">Nama Dosen</Typography>
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
          /> */}
        </Grid>
      </Grid>
    </CustomModalTambah>
  );
};
