import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { postBentukKegiatan } from "../../functions/BentukKegiatan";

export default function TambahBentukKegiatan() {
  const history = useHistory();
  const [namaBentukKegiatan, setNamaBentukKegiatan] = useState("");

  const insertBentukKegiatan = async () => {
    // alert(namaBentukKegiatan);
    const data = {
      nama: namaBentukKegiatan,
    };
    const response = await postBentukKegiatan(data);

    if (response.errorMessage === null) {
      history.push(`/app/bentukkegiatan`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Bentuk Kegiatan"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/bentukkegiatan"
            margin="normal"
          >
            Kembali
          </Button>
        }
      />
      <Grid
        container
        spacing={4}
        style={{ padding: "20px", backgroundColor: "white" }}
      >
        <Grid item xs={6}>
          <InputLabel shrink>Nama Bentuk Kegiatan</InputLabel>
          <TextField
            id="partner"
            value={namaBentukKegiatan}
            onChange={(e) => setNamaBentukKegiatan(e.target.value)}
            type="text"
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
            margin="normal"
            onClick={insertBentukKegiatan}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
