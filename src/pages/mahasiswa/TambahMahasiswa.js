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

import { postMahasiswa } from "../../functions/Mahasiswa";

export default function TambahMahasiswa() {
  const history = useHistory();
  const [namaMahasiswa, setNamaMahasiswa] = useState("");

  const insertMahasiswa = async () => {
    // alert(namaMahasiswa);
    const data = {
      nama: namaMahasiswa,
    };
    const response = await postMahasiswa(data);

    if (response.errorMessage === null) {
      history.push(`/app/mahasiswa`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Mahasiswa"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/mahasiswa"
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
          <InputLabel shrink>Nama Mahasiswa</InputLabel>
          <TextField
            id="partner"
            value={namaMahasiswa}
            onChange={(e) => setNamaMahasiswa(e.target.value)}
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
            onClick={insertMahasiswa}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
