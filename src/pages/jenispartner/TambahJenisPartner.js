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

import { postJenisPartner } from "../../functions/JenisPartner";

export default function TambahJenisPartner() {
  const history = useHistory();
  const [namaJenisPartner, setNamaJenisPartner] = useState("");

  const insertJenisPartner = async () => {
    // alert(namaJenisPartner);
    const data = {
      nama: namaJenisPartner,
    };
    const response = await postJenisPartner(data);

    if (response.errorMessage === null) {
      history.push(`/app/jenispartner`);
    }
  };

  return (
    <>
      <PageTitle
        title="Tambah Jenis Partner"
        button={
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            href="#/app/jenispartner"
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
          <InputLabel shrink>Nama Jenis Partner</InputLabel>
          <TextField
            id="partner"
            value={namaJenisPartner}
            onChange={(e) => setNamaJenisPartner(e.target.value)}
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
            onClick={insertJenisPartner}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
