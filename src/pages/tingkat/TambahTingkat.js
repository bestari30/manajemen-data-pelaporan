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

import { postTingkat } from "../../functions/Tingkat";

export default function TambahTingkat() {
  const history = useHistory();
  const [namaTingkat, setNamaTingkat] = useState("");

  const insertTingkat = async () => {
    // alert(namaTingkat);
    const data = {
      nama: namaTingkat,
    };
    const response = await postTingkat(data);

    if (response.errorMessage === null) {
      history.push(`/app/tingkat`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Tingkat"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/tingkat"
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
          <InputLabel shrink>Nama Tingkat</InputLabel>
          <TextField
            id="partner"
            value={namaTingkat}
            onChange={(e) => setNamaTingkat(e.target.value)}
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
            onClick={insertTingkat}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
