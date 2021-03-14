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

import { postJenisDokumen } from "../../functions/JenisDokumen";

export default function TambahJenisDokumen() {
  const history = useHistory();
  const [namaJenisDokumen, setNamaJenisDokumen] = useState("");

  const insertJenisDokumen = async () => {
    // alert(namaJenisDokumen);
    const data = {
      nama: namaJenisDokumen,
    };
    const response = await postJenisDokumen(data);

    if (response.errorMessage === null) {
      history.push(`/app/jenisdokumen`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Jenis Dokumen"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/jenisdokumen"
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
          <InputLabel shrink>Nama Jenis Dokumen</InputLabel>
          <TextField
            id="partner"
            value={namaJenisDokumen}
            onChange={(e) => setNamaJenisDokumen(e.target.value)}
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
            onClick={insertJenisDokumen}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
