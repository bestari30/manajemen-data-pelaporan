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

import { postKategori } from "../../functions/Kategori";

export default function TambahKategori() {
  const history = useHistory();
  const [namaKategori, setNamaKategori] = useState("");

  const insertKategori = async () => {
    // alert(namaKategori);
    const data = {
      nama: namaKategori,
    };
    const response = await postKategori(data);

    if (response.errorMessage === null) {
      history.push(`/app/kategori`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Kategori"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/kategori"
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
          <InputLabel shrink>Nama Kategori</InputLabel>
          <TextField
            id="partner"
            value={namaKategori}
            onChange={(e) => setNamaKategori(e.target.value)}
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
            onClick={insertKategori}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
